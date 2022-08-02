import { useAppStore } from "@/store/app-store";
import { ServiceRequest, ServiceOption } from "@/types/service";
import { formatParams, formatPromise, isDefined, isDevelopment, isMp } from "@/utils";

const defaultHeader = {
  "Content-Type": "application/json",
};

export function createServiceId() {
  return Symbol("serviceId");
}

export const enum RejectReason {
  NO_PARAM, // 没传参
  OVERRIDE, // 被覆盖
  CHAIN, // 前序请求被reject
}

// <id, stamp>
const overrideId = new Map<any, string>();
// <id, stamp>
const sequenceId = new Map<any, string[]>();
// <stamp, promise>
const responseCache = new Map<string, { resolve: () => any; reject: (e?: any) => any; status: "fulfilled" | "rejected" | "pending" }>();

export function service<T = any>(requestParam: ServiceRequest): Promise<T>;
export function service<T = any>(requestParam: ServiceRequest, options: Omit<ServiceOption, "originResponse">): Promise<T>;
export function service<T = any>(
  requestParam: ServiceRequest,
  options: { originResponse: false } & Omit<ServiceOption, "originResponse">
): Promise<T>;
export function service(
  requestParam: ServiceRequest,
  options: { originResponse: true } & Omit<ServiceOption, "originResponse">
): Promise<UniApp.RequestSuccessCallbackResult & { request: ServiceRequest }>;
export function service<T = any>(
  requestParam: ServiceRequest,
  options?: ServiceOption
): Promise<T | (UniApp.RequestSuccessCallbackResult & { request: ServiceRequest })> {
  if (!requestParam) {
    return Promise.reject({ reason: RejectReason.NO_PARAM });
  }
  const { originResponse = false, override = false, sequence = false, id, customRequest } = options || {};
  const _request = customRequest || request;

  const stamp = handleStamp({ override, sequence, id });

  return new Promise(async (resolve, reject) => {
    if (sequence) {
      responseCache.set(stamp, {
        resolve: () => {},
        reject: e => {
          reject(e);
        },
        status: "pending",
      });
    }
    const [res, err, status] = await formatPromise(_request<T>(requestParam, { originResponse }));
    if (sequence) {
      // return in order
      responseCache.set(stamp, {
        resolve: () => {
          resolve(res!);
        },
        reject: e => {
          reject(Object.assign({}, err, e));
        },
        status: status,
      });
      handleSequence(id);
    } else if (status === "fulfilled") {
      // request success
      if (override) {
        // retain the last request
        const currentStamp = overrideId.get(id);
        if (stamp !== currentStamp) {
          reject({ reason: RejectReason.OVERRIDE });
        } else {
          resolve(res!);
          overrideId.delete(id);
        }
      } else {
        resolve(res!);
      }
    } else if (status === "rejected") {
      // request failed
      reject(err);
    }
  });
}

function normalizeRequestParam(requestParam: ServiceRequest) {
  const { url, method, header, data, params, domain } = requestParam;
  const _header = Object.assign({}, defaultHeader, header);
  let _method: "GET" | "POST" | undefined;
  if (method === "get") _method = "GET";
  else if (method === "post") _method = "POST";
  else _method = method;

  const appStore = useAppStore();
  if (appStore.token) {
    _header.token = appStore.token;
  }
  // 开发环境使用本地token
  if (isDevelopment && import.meta.env.VITE_APP_TOKEN) {
    _header.token = import.meta.env.VITE_APP_TOKEN;
  }
  // 小程序不走devServer, 直接访问域名
  let _url: string = url;
  if (domain) {
    _url = domain + _url;
  } else if (isMp) {
    _url = import.meta.env.VITE_APP_DOMAIN + _url;
  }

  let _data = data;
  if (params) {
    // 将类似axios的参数写法转成uni.request参数
    if (_method === "GET") {
      _data = params;
    } else if (_method === "POST") {
      _url += _url.includes("?") ? "&" : "?" + formatParams(params);
    }
  }

  return {
    url: _url,
    method: _method,
    header: _header,
    data: _data,
  };
}

function handleStamp(options: { id: any; override: boolean; sequence: boolean }) {
  const stamp = Math.random().toString();
  const { id, override, sequence } = options;
  if (override || sequence) {
    if (!isDefined(id)) {
      console.warn("using override or sequence must have an id");
    } else if (override) {
      overrideId.set(id, stamp);
    } else if (sequence) {
      let list = sequenceId.get(id);
      if (!list) {
        sequenceId.set(id, (list = []));
      }
      list.push(stamp);
    }
  }
  return stamp;
}

function request<T>(requestParam: ServiceRequest, options: { originResponse: boolean }) {
  const { url, method, header, data } = normalizeRequestParam(requestParam);
  const { originResponse } = options;
  return new Promise<T | (UniApp.RequestSuccessCallbackResult & { request: ServiceRequest })>((resolve, reject) => {
    uni.request({
      url,
      method,
      header,
      data,
      success: response => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          originResponse ? resolve({ ...response, request: requestParam }) : resolve(response.data as T);
        } else {
          reject(response);
        }
      },
      fail: e => {
        reject(e);
      },
    });
  });
}

function handleSequence(id: any) {
  const sequence = sequenceId.get(id);
  if (sequence) {
    let rejectFlag = false;
    // avoid leaving out elements when shifting sequence
    const _sequence = [...sequence];
    for (const stamp of _sequence) {
      const promise = responseCache.get(stamp);
      if (promise) {
        if (rejectFlag) {
          promise.reject({ reason: RejectReason.CHAIN });
        } else if (promise.status === "fulfilled") {
          promise.resolve();
        } else if (promise.status === "rejected") {
          promise.reject();
          rejectFlag = true;
        }
        if (rejectFlag || promise.status !== "pending") {
          // already handled
          responseCache.delete(stamp);
          sequence.shift();
          if (sequence.length === 0) {
            sequenceId.delete(id);
          }
        } else {
          // pending
          // do not handle the rest part
          return;
        }
      }
    }
  }
}

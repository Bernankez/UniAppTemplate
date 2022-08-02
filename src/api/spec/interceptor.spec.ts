import { beforeEach, describe, it, expect } from "vitest";
import { createServiceId, service } from "../interceptor";

declare module "vitest" {
  export interface TestContext {
    mockRequest: (...args: any[]) => any;
  }
}

beforeEach(async context => {
  let count = 5;
  context.mockRequest = ({ url }) => {
    return new Promise<any>((resolve, reject) => {
      const _count = count;
      setTimeout(() => {
        if (url === "/resolve") {
          resolve(_count);
        } else if (url === "/reject") {
          reject();
        } else if (url === "/some-reject") {
          if (_count === 3) {
            reject();
          } else {
            resolve(_count);
          }
        }
      }, count * 1000);
      if (count > 0) count--;
      else count = 5;
    });
  };
});

describe("interceptor override", () => {
  it("single request", async ({ mockRequest }) => {
    const res = await service({ url: "/resolve" }, { override: true, id: createServiceId(), customRequest: mockRequest });
    expect(res).toBe(5);
  }, 10000);

  it("multiple different requests, all reserved", async ({ mockRequest }) => {
    const res = await Promise.allSettled([
      service({ url: "/some-reject" }, { override: true, id: createServiceId(), customRequest: mockRequest }),
      service({ url: "/some-reject" }, { override: true, id: createServiceId(), customRequest: mockRequest }),
      service({ url: "/some-reject" }, { override: true, id: createServiceId(), customRequest: mockRequest }),
      service({ url: "/some-reject" }, { override: true, id: createServiceId(), customRequest: mockRequest }),
      service({ url: "/some-reject" }, { override: true, id: createServiceId(), customRequest: mockRequest }),
    ]);
    const status = res.map(r => r.status);
    expect(status).toEqual(["fulfilled", "fulfilled", "rejected", "fulfilled", "fulfilled"]);
  }, 20000);

  it("multiple same requests, only retain the last request", async ({ mockRequest }) => {
    const id = createServiceId();
    const res = await Promise.allSettled([
      service({ url: "/resolve" }, { override: true, id, customRequest: mockRequest }),
      service({ url: "/resolve" }, { override: true, id, customRequest: mockRequest }),
      service({ url: "/resolve" }, { override: true, id, customRequest: mockRequest }),
      service({ url: "/resolve" }, { override: true, id, customRequest: mockRequest }),
      service({ url: "/resolve" }, { override: true, id, customRequest: mockRequest }),
    ]);
    const status = res.map(r => r.status);
    expect(status).toEqual(["rejected", "rejected", "rejected", "rejected", "fulfilled"]);
  }, 10000);
});

describe("interceptor sequence", () => {
  it("single request", async ({ mockRequest }) => {
    const res = await service({ url: "/resolve" }, { sequence: true, id: createServiceId(), customRequest: mockRequest });
    expect(res).toBe(5);
  }, 10000);

  it("multiple different requests", async ({ mockRequest }) => {
    const list = await create5(mockRequest);
    expect(list).toEqual([1, 2, 3, 4, 5]);
  }, 10000);

  it("multiple same requests, return by order", async ({ mockRequest }) => {
    const id = createServiceId();
    const list = await create5(mockRequest, { id });
    expect(list).toEqual([5, 4, 3, 2, 1]);
  }, 10000);

  it("multiple same requests, one reject, reject the rest", async ({ mockRequest }) => {
    const id = createServiceId();
    const list = await create5(mockRequest, { id, url: "/some-reject" });
    expect(list).toEqual([5, 4]);
  });
});

function create5(mockRequest, options?: { id?; url? }) {
  const { id, url } = options || {};
  return new Promise((resolve, reject) => {
    const list: number[] = [];
    for (let i = 0; i < 5; i++) {
      service({ url: url || "/resolve" }, { sequence: true, id: id || createServiceId(), customRequest: mockRequest }).then(res => {
        list.push(res);
        // 第0个请求时间最长, 最后一个返回
        if (i === 0) {
          resolve(list);
        }
      });
    }
  });
}

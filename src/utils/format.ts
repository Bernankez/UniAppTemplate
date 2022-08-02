import { isDefined } from "@/utils";

export function formatParams(obj: Record<string, string | number>) {
  const params: string[] = [];
  if (!obj || typeof obj !== "object") {
    console.warn("formatParams: param must be Object");
    return;
  }
  Object.keys(obj).forEach(key => {
    params.push(key + "=" + toString(obj[key]));
  });
  return params.join("&");
}

function toString(obj: any) {
  if (!isDefined(obj)) return "";
  if (typeof obj === "object") {
    return Object.prototype.toString.call(obj);
  } else if (typeof obj === "number") {
    return obj.toString();
  } else {
    return obj;
  }
}

export function formatPromise<T>(promise: Promise<T>) {
  return promise
    .then(res => {
      return [res, undefined, "fulfilled"];
    })
    .catch(e => {
      return [undefined, e, "rejected"];
    }) as unknown as [T | undefined, any, "fulfilled" | "rejected"];
}

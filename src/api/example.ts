import { RestResult } from "@/types/service";
import { service } from "@/api/interceptor";

export const getExample = () =>
  service<RestResult<number>>({
    url: "/api/example",
    method: "post",
    params: { a: 1 },
    data: { b: 2 },
  });

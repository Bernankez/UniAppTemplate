export type ServiceRequest = {
  url: string;
  header?: Record<string, string | number>;
  method?: "post" | "get" | "POST" | "GET";
  params?: Record<string, string | number>;
  data?: Record<string, any> | string | ArrayBuffer;
  timeout?: number;
  domain?: string;
};

export type ServiceOption = {
  originResponse?: boolean;
  override?: boolean; // 只保留最新的请求, 之前的请求会被reject
  sequence?: boolean; // 按请求先后返回结果, 如果有一个请求被reject, 则该请求之后的请求都会被reject, 一般用于分页等对顺序有要求的场景
  id?: any; // 当override或sequence为true时，必须指定id
  // for test only
  customRequest?: <T>(params: ServiceRequest, options: { originResponse: boolean }) => Promise<T>;
};

export type RestResult<T> = {
  code: number;
  status: "SUCCESS" | "FAILURE";
  message: string;
  item: T;
};

import { MockMethod } from "vite-plugin-mock";

const mocks: MockMethod[] = [
  {
    url: "/api/example",
    method: "post",
    statusCode: 200,
    response: ({ body, query }) => {
      console.dir(body, query);
      return {
        status: "SUCCESS",
        code: 0,
        item: "Hello World",
      };
    },
  },
];

export default mocks;

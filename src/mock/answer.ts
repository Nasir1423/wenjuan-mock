import { logSuccessRequest } from "../message";
import { RouteType } from "../types";

const answerRoutes: RouteType[] = [
  /* 收集新建的答卷 */
  {
    url: "/api/answer",
    method: "post",
    response() {
      logSuccessRequest("answer", "收集了用户发送的问卷数据");
      return {
        errno: 0,
      };
    },
  },
];

export default answerRoutes;

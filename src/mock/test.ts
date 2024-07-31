import { Random } from "mockjs";
import { RouteType } from "../types";

const testRoutes: RouteType[] = [
  {
    url: "/api/test",
    method: "get",
    response() {
      return {
        errno: 0,
        data: {
          name: Random.cname(),
        },
      };
    },
  },
];

export default testRoutes;

import getStatList from "../data/getStatList";
import { logSuccessRequest } from "../message";
import { RouteType } from "../types";

const statisticRoutes: RouteType[] = [
  /**
   * 获取特定问卷的答卷列表
   */
  {
    url: "/api/stat/:questionId",
    method: "get",
    response(ctx) {
      const id = ctx?.url.split("/").at(-1) || "000000";
      const data = {
        total: 100,
        list: getStatList(),
      };
      logSuccessRequest(
        "statistic",
        `获取 ${id} 的所有答卷 ${JSON.stringify(data)}`
      );
      return {
        errno: 0,
        data,
      };
    },
  },
  /**
   * 获取特定问卷的单个组件的统计数据汇总
   */
  {
    url: "/api/stat/:questionId/:componentId",
    method: "get",
    response(ctx) {
      const qid = ctx?.url.split("/").at(-2) || "000000";
      const cid = ctx?.url.split("/").at(-1) || "000000";
      const data = {
        stat: [
          { name: "选项1", count: 20 },
          { name: "选项2", count: 30 },
          { name: "选项3", count: 50 },
        ],
      };
      logSuccessRequest(
        "statistic",
        `获取问卷 ${qid} 对应的组件 ${cid} 的统计数据 ${JSON.stringify(data)}`
      );
      return {
        errno: 0,
        data,
      };
    },
  },
];

export default statisticRoutes;

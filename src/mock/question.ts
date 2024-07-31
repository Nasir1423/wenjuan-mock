import { Random } from "mockjs";
import { QuestionType, RouteType } from "../types";
import getQuestionList from "../data/getQuestionList";

const questionRoutes: RouteType[] = [
  /* 获取单个问卷信息
      method -> get
      path -> /api/question/:id
      response -> { errno: 0, data: { id, title, ... } }
  */
  {
    url: "/api/question/:id",
    method: "get",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
        },
      };
    },
  },
  /* 创建问卷
      method -> post
      path -> /api/question
      request body -> 无
      response -> { errno: 0, data: { id } }
  */
  {
    url: "/api/question",
    method: "post",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
  /* 查询问卷列表
      method -> get
      path -> /api/question
      response -> { errno: 0, data: { list: [...] }, total }
  */
  {
    url: "/api/question",
    method: "get",
    response(ctx) {
      /* 根据 ctx.url 的不同返回不同类型的数据 */
      let list: QuestionType[];
      if (ctx?.url.includes("isStar=true"))
        list = getQuestionList({ isStar: true });
      else if (ctx?.url.includes("isDeleted=true"))
        list = getQuestionList({ isDeleted: true });
      else list = getQuestionList();

      return {
        errno: 0,
        data: {
          list, // 当前页
          total: 100, // 总数
        },
      };
    },
  },
];

export default questionRoutes;

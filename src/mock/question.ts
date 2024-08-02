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
    response(ctx) {
      return {
        errno: 0,
        data: {
          id: ctx?.url.split("/").at(-1) || "000000",
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
      const query = ctx?.query || {};
      const searchOption = {
        keywords: query.keywords as string,
        isDeleted: Boolean(query.isDeleted),
        isStar: Boolean(query.isStar),
        page: parseInt(query.page as string),
        pageSize: parseInt(query.pageSize as string),
      };
      const list: QuestionType[] = getQuestionList(searchOption);

      return {
        errno: 0,
        data: {
          list, // 当前页
          total: 100, // 总数
        },
      };
    },
  },
  /* 更新问卷
      method -> patch
      path -> /api/question/:id
      request body -> { title, isStar, ... }
      response -> { errno: 0 }
  */
  {
    url: "/api/question/:id",
    method: "patch",
    response(ctx) {
      console.log(
        `问卷 ${ctx?.url
          .split("/")
          .at(-1)} 正在更新中 ...；修改的字段为 ${Object.keys(
          ctx?.request.body || ""
        )}`
      );
      return {
        errno: 0,
      };
    },
  },
  /* 复制问卷
      method -> post
      path -> /api/question/:id
      response -> { errno: 0, data: { id } }
  */
  {
    url: "/api/question/duplicate/:id",
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
  /* 删除问卷（彻底删除）
      method -> delete
      path -> /api/question
      request body -> { ids: [ ... ] }
      response -> { errno: 0 }
  */
  {
    url: "/api/question",
    method: "delete",
    response() {
      return {
        errno: 0,
      };
    },
  },
];

export default questionRoutes;

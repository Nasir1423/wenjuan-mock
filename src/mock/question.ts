import { Random } from "mockjs";
import { QuestionType, RouteType } from "../types";
import getQuestionList from "../data/getQuestionList";
import { logSuccessRequest } from "../message";

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
      const data = {
        id: ctx?.url.split("/").at(-1) || "000000",
        title: Random.ctitle(),
        // 组件列表
        componentList: [
          {
            id: Random.id(),
            type: "questionTitle",
            title: "标题",
            props: { text: "一行标题-mock", level: 1, alignCenter: false },
          },
          {
            id: Random.id(),
            type: "questionInput",
            title: "输入框",
            props: { text: "输入框标题-mock", placeholder: "请输入...-mock" },
          },
          {
            id: Random.id(),
            type: "questionInput",
            title: "输入框",
            props: { text: "输入框标题-mock2", placeholder: "请输入...-mock2" },
          },
        ],
      };
      logSuccessRequest(
        "question",
        `获取问卷 ${data.id} 信息 ${JSON.stringify(data)}`
      );
      return {
        errno: 0,
        data,
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
      const data = {
        id: Random.id(),
      };
      logSuccessRequest("question", `创建问卷 ${data.id}`);
      return {
        errno: 0,
        data,
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
      const data = {
        list, // 当前页
        total: 100, // 总数
      };
      logSuccessRequest("question", `查询问卷列表 ${JSON.stringify(data)}`);
      return {
        errno: 0,
        data,
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
      const id = ctx?.url.split("/").at(-1);
      const fields = `${Object.keys(ctx?.request.body || "")}`;
      logSuccessRequest("question", `更新问卷 ${id}，修改的字段为 ${fields}`);
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
      const data = {
        id: Random.id(),
      };
      logSuccessRequest("question", `复制问卷，新问卷为 ${data.id}`);
      return {
        errno: 0,
        data,
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
      logSuccessRequest("question", "彻底删除指定问卷");
      return {
        errno: 0,
      };
    },
  },
];

export default questionRoutes;

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
        desc: "问卷描述",
        js: "",
        css: "",
        // 组件列表
        componentList: [
          {
            fe_id: Random.id(),
            type: "questionInfo",
            title: "问卷标题",
            isHidden: false,
            isLocked: false,
            props: {
              title: "个人信息收集表单",
              desc: "for better service",
            },
          },
          {
            fe_id: Random.id(),
            type: "questionTitle",
            title: "标题",
            isHidden: false,
            isLocked: false,
            props: { text: "基本信息", level: 1, alignCenter: false },
          },
          {
            fe_id: Random.id(),
            type: "questionInput",
            title: "输入框",
            isHidden: false,
            isLocked: false,
            props: { text: "姓名", placeholder: "请输入你的姓名" },
          },
          {
            fe_id: Random.id(),
            type: "questionInput",
            title: "输入框",
            isHidden: false,
            isLocked: false,
            props: { text: "年龄", placeholder: "请输入你的年龄" },
          },
          {
            fe_id: Random.id(),
            type: "questionRadio",
            title: "问卷单选",
            isHidden: false,
            isLocked: false,
            props: {
              title: "性别",
              isVertical: false,
              value: "",
              options: [
                { value: "male", text: "男" },
                { value: "female", text: "女" },
              ],
            },
          },
          {
            fe_id: Random.id(),
            type: "questionTitle",
            title: "标题",
            isHidden: false,
            isLocked: false,
            props: { text: "自我评价", level: 2, alignCenter: false },
          },
          {
            fe_id: Random.id(),
            type: "questionParagraph",
            title: "段落",
            isHidden: false,
            isLocked: false,
            props: { text: "请输入你的自我评价", isCenter: false },
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

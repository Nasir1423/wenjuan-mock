import { Context } from "koa";
type RouteType = {
  url: string;
  method: string;
  response: ResType;
};

type ResType = (ctx?: Context) => {
  errno: number;
  data?: object;
  message?: string;
};

type QuestionType = {
  id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
  isDeleted: boolean;
};

export { RouteType, ResType, QuestionType };

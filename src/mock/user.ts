import { Random } from "mockjs";
import { RouteType } from "../types";
import { logSuccessRequest } from "../message";

const userRoutes: RouteType[] = [
  /* 获取用户信息
      method -> get
      path -> /api/user/info
      response -> { errno: 0, data: { ... } } 
  */
  {
    url: "/api/user/info",
    method: "get",
    response() {
      const data = {
        username: Random.title(),
        nickname: Random.cname(),
      };
      logSuccessRequest("user", `请求用户信息 ${JSON.stringify(data)}`);
      return {
        errno: 0,
        data,
      };
    },
  },
  /* 注册
      method -> post
      path -> /api/user/register
      request body -> { username, password, nickname }
      response -> { errno: 0 } 
  */
  {
    url: "/api/user/register",
    method: "post",
    response() {
      logSuccessRequest("user", "用户注册");
      return { errno: 0 };
    },
  },
  /* 登录
      method -> post
      path -> /api/user/login
      request body -> { username, password }
      response -> { errno: 0, data: { token } } (JWT token)
  */
  {
    url: "/api/user/login",
    method: "post",
    response() {
      const data = {
        token: Random.word(20),
      };
      logSuccessRequest("user", `用户登录 ${JSON.stringify(data)}`);
      return {
        errno: 0,
        data,
      };
    },
  },
];

export default userRoutes;

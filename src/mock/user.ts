import { Random } from "mockjs";
import { RouteType } from "../types";

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
      console.log("用户：请求信息");
      return {
        errno: 0,
        data: {
          username: Random.title(),
          nickname: Random.cname(),
        },
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
      console.log("用户：请求注册");
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
      console.log("用户：请求登录");
      return {
        errno: 0,
        data: {
          token: Random.word(20),
        },
      };
    },
  },
];

export default userRoutes;

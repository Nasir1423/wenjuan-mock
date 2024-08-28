import Koa, { Context } from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors"; // 引入 koa-cors
import mockRoutes from "./mock";
import { ResType } from "./types";

const app = new Koa();
const router = new Router();

// 使用 koa-cors 中间件配置 CORS
app.use(
  cors({
    origin: "*", // 允许所有源进行访问
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use(bodyParser());

/*
 * 注册 mock 路由
 * 遍历 mockList 中的每个路由配置，依次为其注册路由处理程序
 */
mockRoutes.forEach((route) => {
  const { url, method, response } = route;
  (router as any)[method](url, async (ctx: Context) => {
    const res = await getRes(response, ctx); // getRes 模拟网络请求，延迟 0.5s 后返回包含请求数据的 Promise；response 用于获取请求数据的函数
    ctx.body = res; // 设置响应体
  });
});

/*
 * 使用 router 中定义的路由
 * 将路由中间件挂载到 Koa 应用实例上
 */
app.use(router.routes());

/*
 * 启动服务器，监听 3000 端口
 * 成功启动后输出详细的启动信息
 */
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

/**
 *
 * @description 模拟异步获取响应的函数 * 使用 setTimeout 模拟异步操作，1 秒后返回 response 函数的结果
 * @param {ResType} fn - 用于生成响应数据的函数
 * @param {Context} ctx - 包含请求和响应信息的上下文对象
 * @returns {Promise<any>} - 包含响应数据的 Promise
 */
async function getRes(fn: ResType, ctx: Context): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, 500);
  });
}

const Koa = require("koa");
const Router = require("koa-router");
const mockList = require("./mock/index");

const app = new Koa();
const router = new Router();

/* 
 * 注册 mock 路由 
 * 遍历 mockList 中的每个路由配置，依次为其注册路由处理程序
 */
mockList.forEach((route) => {
  const { url, method, response } = route;
  router[method](url, async (ctx) => {
    const res = await getRes(response);
    ctx.body = res;
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
 * 模拟异步获取响应的函数
 * 使用 setTimeout 模拟异步操作，1 秒后返回 response 函数的结果
 * @param {Function} fn - 用于生成响应数据的函数
 * @returns {Promise<any>} - 包含响应数据的 Promise
 */
async function getRes(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn();
      resolve(res);
    }, 1000);
  });
}

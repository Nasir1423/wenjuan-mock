"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const mock_1 = __importDefault(require("./mock"));
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use((0, koa_bodyparser_1.default)());
/*
 * 注册 mock 路由
 * 遍历 mockList 中的每个路由配置，依次为其注册路由处理程序
 */
mock_1.default.forEach((route) => {
    const { url, method, response } = route;
    router[method](url, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield getRes(response, ctx); // getRes 模拟网络请求，延迟 0.5s 后返回包含请求数据的 Promise；response 用于获取请求数据的函数
        ctx.body = res; // 设置响应体
    }));
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
function getRes(fn, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                const res = fn(ctx);
                resolve(res);
            }, 500);
        });
    });
}

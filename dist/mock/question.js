"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockjs_1 = require("mockjs");
const getQuestionList_1 = __importDefault(require("../data/getQuestionList"));
const questionRoutes = [
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
                    id: mockjs_1.Random.id(),
                    title: mockjs_1.Random.ctitle(),
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
                    id: mockjs_1.Random.id(),
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
            let pageType;
            console.log("------------------");
            console.log(ctx === null || ctx === void 0 ? void 0 : ctx.url);
            console.log(ctx === null || ctx === void 0 ? void 0 : ctx.URL);
            return {
                errno: 0,
                data: {
                    list: (0, getQuestionList_1.default)(), // 当前页
                    total: 100, // 总数
                },
            };
        },
    },
];
exports.default = questionRoutes;

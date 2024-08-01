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
            const query = (ctx === null || ctx === void 0 ? void 0 : ctx.query) || {};
            const searchOption = {
                keywords: query.keywords,
                isDeleted: Boolean(query.isDeleted),
                isStar: Boolean(query.isStar),
                page: parseInt(query.page),
                pageSize: parseInt(query.pageSize),
            };
            const list = (0, getQuestionList_1.default)(searchOption);
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
            console.log(`问卷 ${ctx === null || ctx === void 0 ? void 0 : ctx.url.split("/").at(-1)} 正在更新中 ...`);
            console.log(ctx === null || ctx === void 0 ? void 0 : ctx.request);
            return {
                isStar: 0,
                errno: 0,
            };
        },
    },
];
exports.default = questionRoutes;

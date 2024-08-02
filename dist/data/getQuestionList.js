"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockjs_1 = require("mockjs");
/**
 * @description 模拟满足一定规则的问卷列表
 * @param {PropsType} props
 */
function getQuestionList(props = {}) {
    const { keywords = "", isDeleted = false, isStar = false, page = 1, pageSize = 10, } = props;
    const questionList = [];
    for (let i = 0; i < pageSize; i++) {
        const question = {
            id: mockjs_1.Random.id(),
            title: mockjs_1.Random.ctitle(),
            isPublished: mockjs_1.Random.boolean(),
            isStar: isStar || mockjs_1.Random.boolean(),
            answerCount: mockjs_1.Random.natural(50, 100),
            createdAt: mockjs_1.Random.datetime(),
            isDeleted,
        };
        questionList.push(question);
    }
    return questionList;
}
exports.default = getQuestionList;

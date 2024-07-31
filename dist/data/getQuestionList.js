"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockjs_1 = require("mockjs");
/**
 * @description 模拟满足一定规则的问卷列表
 * @param {number} len 列表长度
 * @param {boolean} isDeleted true 加载所有回收站问卷，false 加载所有不在回收站的问卷
 * @param {boolean} isStar true 加载所有星标问卷，false 都加载
 */
function getQuestionList(len = 10, isDeleted = false, isStar = false) {
    const questionList = [];
    while (--len >= 0) {
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

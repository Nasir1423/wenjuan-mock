import { Random } from "mockjs";
import { QuestionType } from "../types";

/**
 * @description 模拟满足一定规则的问卷列表
 * @param {number} len 列表长度
 * @param {boolean} isDeleted true 加载所有回收站问卷，false 加载所有不在回收站的问卷
 * @param {boolean} isStar true 加载所有星标问卷，false 都加载
 */
function getQuestionList(
  len: number = 10,
  isDeleted: boolean = false,
  isStar: boolean = false
): QuestionType[] {
  const questionList = [];
  while (--len >= 0) {
    const question = {
      id: Random.id(),
      title: Random.ctitle(),
      isPublished: Random.boolean(),
      isStar: isStar || Random.boolean(),
      answerCount: Random.natural(50, 100),
      createdAt: Random.datetime(),
      isDeleted,
    };
    questionList.push(question);
  }
  return questionList;
}

export default getQuestionList;

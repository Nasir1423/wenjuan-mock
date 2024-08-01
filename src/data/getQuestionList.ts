import { Random } from "mockjs";
import { QuestionType } from "../types";

type PropsType = {
  keywords: string;
  isPublished: boolean;
  isDeleted: boolean; // true 则加载所有回收站问卷；false 则加载所有非回收站问卷
  isStar: boolean; // true 则加载所有星标问卷；false 则正常加载
  page: number;
  pageSize: number;
};

/**
 * @description 模拟满足一定规则的问卷列表
 * @param {PropsType} props
 */
function getQuestionList(props: Partial<PropsType> = {}): QuestionType[] {
  const {
    keywords = "",
    isDeleted = false,
    isStar = false,
    page = 1,
    pageSize = 10,
  } = props;
  const questionList = [];
  for (let i = 0; i < pageSize; i++) {
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

import { Random } from "mockjs";
import { QuestionType } from "../types";

type PropsType = {
  len?: number;
  isDeleted?: boolean;
  isStar?: boolean;
};

/**
 * @description 模拟满足一定规则的问卷列表
 * @param {PropsType} props.len len 列表长度; isDeleted true 加载所有回收站问卷，false 都加载; isStar true 加载所有星标问卷，false 都加载
 */
function getQuestionList(props: PropsType = {}): QuestionType[] {
  const { len = 10, isDeleted = false, isStar = false } = props;
  const questionList = [];
  for (let i = 0; i < len; i++) {
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

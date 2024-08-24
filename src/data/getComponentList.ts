import { Random } from "mockjs";

type ComponentType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden: boolean;
  isLocked: boolean;
  props: {
    [key: string]: any;
  };
};

/**
 * @description 模拟特定问卷的组件列表
 */
const getComponentList = (): ComponentType[] => {
  return [
    {
      fe_id: "componentId-a",
      type: "questionInfo",
      title: "问卷标题",
      isHidden: false,
      isLocked: false,
      props: {
        title: "个人信息收集表单",
        desc: "for better service",
      },
    },
    {
      fe_id: "componentId-b",
      type: "questionTitle",
      title: "标题",
      isHidden: false,
      isLocked: false,
      props: { text: "基本信息", level: 1, alignCenter: false },
    },
    {
      fe_id: "componentId-c",
      type: "questionInput",
      title: "输入框",
      isHidden: false,
      isLocked: false,
      props: { text: "姓名", placeholder: "请输入你的姓名" },
    },
    {
      fe_id: "componentId-d",
      type: "questionInput",
      title: "输入框",
      isHidden: false,
      isLocked: false,
      props: { text: "年龄", placeholder: "请输入你的年龄" },
    },
    {
      fe_id: "componentId-e",
      type: "questionRadio",
      title: "问卷单选框",
      isHidden: false,
      isLocked: false,
      props: {
        title: "性别",
        isVertical: false,
        value: "",
        options: [
          { value: "male", text: "男" },
          { value: "female", text: "女" },
        ],
      },
    },
    {
      fe_id: "componentId-f",
      type: "questionTitle",
      title: "标题",
      isHidden: false,
      isLocked: false,
      props: { text: "自我评价", level: 2, alignCenter: false },
    },
    {
      fe_id: "componentId-g",
      type: "questionParagraph",
      title: "段落",
      isHidden: false,
      isLocked: false,
      props: { text: "请输入你的自我评价", isCenter: false },
    },
    {
      fe_id: "componentId-z",
      type: "questionTextArea",
      title: "多行输入",
      isHidden: false,
      isLocked: false,
      props: { title: "请在下边输入你的自我评价", text: "请输入你的自我评价" },
    },
    {
      fe_id: "componentId-h",
      type: "questionCheckbox",
      title: "问卷多选框",
      isHidden: false,
      isLocked: false,
      props: {
        title: "语言",
        isVertical: false,
        list: [
          { value: "c", text: "C 语言", checked: false },
          { value: "py", text: "python", checked: true },
          { value: "js", text: "JavaScript", checked: true },
        ],
      },
    },
  ];
};

export default getComponentList;

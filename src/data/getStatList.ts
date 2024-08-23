import { Random } from "mockjs";
import getComponentList from "./getComponentList";

/**
 * @description 模拟特定问卷的答卷列表
 */
const getStatList = (len = 10) => {
  const componentList = getComponentList();

  const statList = [];

  // 生成指定数量的答卷
  for (let i = 0; i < len; i++) {
    const stat: { [key: string]: any } = {
      _id: Random.id(),
    };
    // 根据特定问卷的组件列表，生成一份答卷（只统计可统计的组件对应的答案）
    componentList.forEach((component) => {
      const { fe_id, type } = component;

      // 根据组件的类型模拟不同的答案
      switch (type) {
        case "questionInput":
          stat[fe_id] = Random.ctitle();
          break;
        case "questionTextArea":
          stat[fe_id] = Random.ctitle();
          break;
        case "questionRadio":
          const { options } = component.props;
          const index = Math.floor(Math.random() * options.length);
          stat[fe_id] = options[index].text;
          break;
        case "questionCheckbox":
          const { list } = component.props;
          const checked: string[] = [];
          list.forEach((item: { checked: any; text: string; }) => {
            if (item.checked) checked.push(item.text);
          });
          stat[fe_id] = checked.join(",");
          break;
        default:
          break;
      }
    });

    statList.push(stat);
  }

  return statList;
};

export default getStatList;

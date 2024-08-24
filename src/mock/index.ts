import { RouteType } from "../types";
import testRoutes from "./test";
import questionRoutes from "./question";
import userRoutes from "./user";
import statisticRoutes from "./statistic";
import answerRoutes from "./answer";

const mockRoutes: RouteType[] = [
  ...answerRoutes,
  ...testRoutes,
  ...questionRoutes,
  ...userRoutes,
  ...statisticRoutes,
];

export default mockRoutes;

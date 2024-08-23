import { RouteType } from "../types";
import testRoutes from "./test";
import questionRoutes from "./question";
import userRoutes from "./user";
import statisticRoutes from "./statistic";

const mockRoutes: RouteType[] = [
  ...testRoutes,
  ...questionRoutes,
  ...userRoutes,
  ...statisticRoutes
];

export default mockRoutes;

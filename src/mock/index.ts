import { RouteType } from "../types";
import testRoutes from "./test";
import questionRoutes from "./question";
import userRoutes from "./user";

const mockRoutes: RouteType[] = [
  ...testRoutes,
  ...questionRoutes,
  ...userRoutes,
];

export default mockRoutes;

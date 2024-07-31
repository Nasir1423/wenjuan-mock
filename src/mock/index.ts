import { RouteType } from "../types";
import testRoutes from "./test";
import questionRoutes from "./question";

const mockRoutes: RouteType[] = [...testRoutes, ...questionRoutes];

export default mockRoutes;

import type { ReactNode } from "react";
import { rootRoutes } from "./appRoutes";
import { generateRoute } from "./utils/generateRoute";

export const routes: ReactNode = generateRoute(rootRoutes);

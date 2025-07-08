import HomePage from "../pages/HomePage/HomePage";
import type { RouteType } from "./config";

export const mainLayout: RouteType[] = [
    {
        index: true,
        element: <HomePage />,
        state: "home",
    },
];

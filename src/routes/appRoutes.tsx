import HomePage from "../pages/HomePage/HomePage";
import DashboardLayout from "../pages/Layout/DashboardLayout";
import MainLayout from "../pages/Layout/MainLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import type { RouteType } from "./config";

export const rootRoutes: RouteType[] = [
    {
        element: <MainLayout />,
        state: "mainLayout",
        child: [
            {
                index: true,
                element: <HomePage />,
                state: "home"
            }
        ],

    },
    {
        element: <DashboardLayout />,
        state: "mainLayout",
        child: [
            {
                path: "login",
                element: <LoginPage />,
                state: "home"
            }
        ]
    }
];

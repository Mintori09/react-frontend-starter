import { lazy } from "react";

// Layout
import MainLayout from "../components/layouts/MainLayout";

// Lazy-loaded Pages
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/HomePage/AboutPage"));
const LoginPage = lazy(() => import("../pages/AuthPage/pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/AuthPage/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/AuthPage/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/AuthPage/pages/ResetPasswordPage"));


import type { RouteType } from "./config";
import ContactPage from "../pages/HomePage/ContactPage";
import { Contact } from "lucide-react";
import UnauthorizedPage from "../pages/HomePage/UnauthorizedPage";
import InformationPage from "../pages/UsersPage/InformationPage";
import ListUsers from "../pages/UserPage/ListUsers";

export const rootRoutes: RouteType[] = [
    {
        element: <MainLayout />,
        state: "mainLayout",
        child: [
            {
                index: true,
                element: <HomePage />,
                state: "home",
            },
            {
                path: "*",
                element: <HomePage />,
                state: "notFound",
            },
            {
                path: "login",
                element: <LoginPage />,
                state: "login",
                protected: false
            },
            {
                path: "forgot-password",
                state: "forgot password",
                element: <ForgotPasswordPage />

            },
            {
                path: "register",
                state: "register",
                element: <RegisterPage />,
                protected: false
            },
            {
                path: "reset-password",
                state: "reset-password",
                element: <ResetPasswordPage />
            },
            {
                path: "about",
                state: "about",
                element: <AboutPage />
            },
            {
                path: "contact",
                state: "contact",
                element: <ContactPage />,
                props: {
                    displayText: "Contact",
                    icon: <Contact />
                }
            },
            {
                path: "info",
                state: "info",
                element: <InformationPage />,
                allowedRoles: ["admin"],
                protected: true
            },
            {
                path: "users",
                state: "users",
                element: <ListUsers />,
                allowedRoles: ["admin"],
                protected: true
            }
        ],
    },
    {
        path: "unauthorized",
        state: "unauthorized",
        element: <UnauthorizedPage />,
    },
];



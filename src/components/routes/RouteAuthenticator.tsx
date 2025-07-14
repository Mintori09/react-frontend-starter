import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { RouteType } from "../../routes/config";
import { useAuth } from "../../hooks/useAuth";
import PageWrapper from "../layouts/Wrapper";

interface RouteAuthenticatorProps {
    route: RouteType;
    children: ReactNode;
}

const RouteAuthenticator: React.FC<RouteAuthenticatorProps> = ({
    route,
    children,
}) => {
    const { isAuthenticated, user } = useAuth();

    // ✅ Route yêu cầu đăng nhập
    if (route.protected === true) {
        // ❌ Chưa đăng nhập
        if (!isAuthenticated || !user) {
            return <Navigate to="/unauthorized" replace />;
        }

        // ❌ Đã đăng nhập nhưng sai quyền
        const hasRole = route.allowedRoles
            ? route.allowedRoles.includes(user.role)
            : true;

        if (!hasRole) {
            return <Navigate to="/unauthorized" replace />;
        }

        // ✅ Đủ điều kiện: Cho phép truy cập
        return (
            <PageWrapper state={route.child ? undefined : route.state}>
                {children}
            </PageWrapper>
        );
    }

    // ✅ Route công khai
    if (route.protected === false) {
        // ❌ Nếu đã đăng nhập mà vào /login hoặc /register → redirect
        if (
            isAuthenticated &&
            (route.path === "login" || route.path === "register")
        ) {
            return <Navigate to="/dashboard" replace />;
        }

        // ✅ Công khai, tiếp tục render
        return (
            <PageWrapper state={route.child ? undefined : route.state}>
                {children}
            </PageWrapper>
        );
    }

    // ✅ Trường hợp không khai báo protected → coi như công khai
    return (
        <PageWrapper state={route.child ? undefined : route.state}>
            {children}
        </PageWrapper>
    );
};

export default RouteAuthenticator;



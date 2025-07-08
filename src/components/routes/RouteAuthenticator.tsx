import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteType } from '../../routes/config';
import { useAuth } from '../../hooks/useAuth';
import PageWrapper from '../../pages/Layout/Wrapper';

interface RouteAuthenticatorProps {
    route: RouteType;
    children: ReactNode;
}

const RouteAuthenticator: React.FC<RouteAuthenticatorProps> = ({ route, children }) => {
    const { isAuthenticated, user, loading } = useAuth();

    // ⏳ Trạng thái loading
    if (loading) return <div>Loading authentication...</div>;

    // Handle protected routes
    if (route.protected === true) {
        // ❌ Chưa đăng nhập
        if (!isAuthenticated || !user) {
            return <Navigate to="/unauthorized" replace />;
        }

        // ❌ Có login, nhưng không có quyền
        const hasRole = route.allowedRoles ? route.allowedRoles.some(role => user.role.includes(role)) : true;
        if (!hasRole) {
            return <Navigate to="/unauthorized" replace />;
        }

        // ✅ Đủ điều kiện: render bình thường
        return <PageWrapper state={route.child ? undefined : route.state}>{children}</PageWrapper>;
    }

    if (!route.protected) {
        if (isAuthenticated && route.path === "/login") {
            return <Navigate to="/dashboard" replace />;
        }
        return <PageWrapper state={route.child ? undefined : route.state}>{children}</PageWrapper>;
    }

    return <PageWrapper state={route.child ? undefined : route.state}>{children}</PageWrapper>;
};

export default RouteAuthenticator;

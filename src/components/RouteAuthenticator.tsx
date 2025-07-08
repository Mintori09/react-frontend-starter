import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import featureFlags from '../configs/featureFlags';
import PageWrapper from './layout/PageWrapper';
import type { RouteType } from '../routes/config';

interface RouteAuthenticatorProps {
    route: RouteType;
    children: ReactNode;
}

const RouteAuthenticator: React.FC<RouteAuthenticatorProps> = ({ route, children }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (!featureFlags.enableAuthentication) {
        return <PageWrapper state={route.child ? undefined : route.state}>{children}</PageWrapper>;
    }

    // ⏳ Trạng thái loading
    if (loading) return <div>Loading authentication...</div>;

    // Handle protected routes
    if (route.protected === true) {
        // ❌ Chưa đăng nhập
        if (!isAuthenticated || !user) {
            return <Navigate to="/unauthorized" replace />;
        }

        // ❌ Có login, nhưng không có quyền
        const hasRole = route.allowedRoles ? route.allowedRoles.some(role => user.roles.includes(role)) : true;
        if (!hasRole) {
            return <Navigate to="/unauthorized" replace />;
        }

        // ✅ Đủ điều kiện: render bình thường
        return <PageWrapper state={route.child ? undefined : route.state}>{children}</PageWrapper>;
    }

    // Handle public routes
    if (!route.protected) {
        // Redirect authenticated users only from the login page
        if (isAuthenticated && route.path === "/login") {
            return <Navigate to="/dashboard" replace />;
        }
        // Render public route for both authenticated and unauthenticated users (except login for authenticated)
        return <PageWrapper state={route.child ? undefined : route.state}>{children}</PageWrapper>;
    }

    // Render protected route if authenticated and authorized (handled above)
    // This part should ideally not be reached if the protected logic is correct,
    // but kept as a fallback or for clarity.
    return <PageWrapper state={route.child ? undefined : route.state}>{children}</PageWrapper>;
};

export default RouteAuthenticator;

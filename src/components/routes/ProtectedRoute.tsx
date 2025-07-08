import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
    allowedRoles?: string[];
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { isAuthenticated, user, loading } = useAuth();

    // ⏳ Trạng thái loading
    if (loading) return <div>Loading authentication...</div>;

    // ❌ Chưa đăng nhập
    if (!isAuthenticated || !user) {
        return <Navigate to="/unauthorized" replace />;
    }

    // ❌ Có login, nhưng không có quyền
    const hasRole = allowedRoles ? allowedRoles.some(role => user.role.includes(role)) : true;
    if (!hasRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    // ✅ Đủ điều kiện: render bình thường
    return <>{children}</>;
};

export default ProtectedRoute;

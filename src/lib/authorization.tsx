import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useUser } from './auth-provider';
import { paths } from '@/config/paths';

export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
} as const;

export type RoleTypes = keyof typeof ROLES;

export const POLICIES = () => {
    return true;
};

export const useAuthorization = () => {
    const user = useUser();

    const checkAccess = React.useCallback(
        ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
            if (allowedRoles && allowedRoles.length > 0 && user.data) {
                return allowedRoles?.includes(user.data.role);
            }
            return true;
        },
        [user.data],
    );
    return { checkAccess, role: user.data?.role };
};

type AuthorizationProps = {
    forbiddenFallback?: React.ReactNode;
    children: React.ReactNode;
} & (
    | {
          allowedRoles: RoleTypes[];
          policyCheck?: never;
      }
    | {
          allowedRoles?: RoleTypes[];
          policyCheck: boolean;
      }
);

export const Authorization = ({
    policyCheck,
    allowedRoles,
    forbiddenFallback = null,
    children,
}: AuthorizationProps) => {
    const { checkAccess } = useAuthorization();
    let canAccess = false;

    if (allowedRoles) {
        canAccess = checkAccess({ allowedRoles });
    }

    if (typeof policyCheck !== 'undefined') {
        canAccess = policyCheck;
    }

    return <>{canAccess ? children : forbiddenFallback}</>;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useUser();
    const location = useLocation();

    if (!user.data) {
        return (
            <Navigate
                to={paths.auth.login.getHref(location.pathname)}
                replace
            />
        );
    }

    return children;
};

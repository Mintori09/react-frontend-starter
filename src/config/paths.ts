export const paths = {
    home: {
        path: '/',
        getHref: () => '/',
    },

    auth: {
        register: {
            path: '/auth/register',
            getHref: (redirectTo?: string | null | undefined) =>
                `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
        },
        login: {
            path: '/auth/login',
            getHref: (redirectTo?: string | null | undefined) =>
                `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
        },
        forgotPassword: {
            path: '/auth/forgot-password',
            getHref: () => '/auth/forgot-password',
        },
        resetPassword: {
            path: '/auth/reset-password',
            getHref: (token: string) => `/auth/reset-password?token=${token}`,
        },
        verifyEmail: {
            path: '/auth/verify-email',
            getHref: (token: string) => `/auth/verify-email?token=${token}`,
        },
    },

    app: {
        root: {
            path: '/app',
            getHref: () => '/app',
        },

        dashboard: {
            path: '',
            getHref: () => '/app',
        },

        users: {
            path: 'users',
            getHref: () => '/app/users',
        },
        profile: {
            path: 'profile',
            getHref: () => '/app/profile',
        },
    },
} as const;

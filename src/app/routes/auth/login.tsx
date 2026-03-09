import { useNavigate, useSearchParams } from 'react-router';
import { AuthLayout } from '@/components/layouts';
import { LoginForm } from '@/features/auth/components/login-form';
import { paths } from '@/config/paths';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');

    return (
        <AuthLayout title="Log in to your account">
            <LoginForm
                onSuccess={() =>
                    navigate(redirectTo || paths.app.dashboard.getHref(), {
                        replace: true,
                    })
                }
            />
        </AuthLayout>
    );
};

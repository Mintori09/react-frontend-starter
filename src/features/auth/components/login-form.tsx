import * as React from 'react';
import { useLogin } from '@/lib/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useMutation } from '@tanstack/react-query';
import { sendVerificationEmail } from '@/lib/auth';
import { useNotifications } from '@/components/ui/notifications';

type LoginFormProps = {
    onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const { addNotification } = useNotifications();
    const login = useLogin({
        onSuccess,
    });

    const [isEmailUnverified, setIsEmailUnverified] = React.useState(false);
    const [unverifiedEmail, setUnverifiedEmail] = React.useState('');

    const resendVerification = useMutation({
        mutationFn: () => sendVerificationEmail(unverifiedEmail),
        onSuccess: (data) => {
            addNotification({
                type: 'success',
                title: 'Success',
                message: data.message || 'Verification email sent',
            });
            setIsEmailUnverified(false);
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        login.mutate(
            { email, password },
            {
                onError: (error: any) => {
                    const data = error.response?.data;
                    if (error.response?.status === 401 && (data?.message?.includes('verified') || data?.error === 'EmailNotVerified')) {
                        setIsEmailUnverified(true);
                        setUnverifiedEmail(email);
                    }
                },
            }
        );
    };

    return (
        <div>
            {isEmailUnverified && (
                <div className="mb-4 rounded-md bg-yellow-50 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                                Email not verified
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>
                                    Your email address is not verified. Please check your inbox or click below to resend.
                                </p>
                            </div>
                            <div className="mt-4">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => resendVerification.mutate()}
                                    disabled={resendVerification.isPending}
                                >
                                    {resendVerification.isPending ? 'Sending...' : 'Resend Verification'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="mt-1">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="mt-1">
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={login.isPending}
                    >
                        {login.isPending ? 'Logging in...' : 'Log in'}
                    </Button>
                </div>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or
                        </span>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                    <Link to={paths.auth.register.getHref()} className="text-center">
                        Register
                    </Link>
                    <Link to={paths.auth.forgotPassword.getHref()} className="text-center">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

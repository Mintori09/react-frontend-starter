import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/components/ui/link';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { HttpStatus } from '@/types/http';

import { sendVerificationEmail } from '../api/auth';
import { useLogin } from '../lib/auth-provider';
import { loginInputSchema, type LoginInput } from '../types';

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginInputSchema),
    });

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

    const onSubmit = (data: LoginInput) => {
        login.mutate(data, {
            onError: (error) => {
                const axiosError = error as AxiosError;
                const apiData = axiosError.response?.data as {
                    message?: string;
                    error?: string;
                };
                if (
                    axiosError.response?.status === HttpStatus.UNAUTHORIZED &&
                    (apiData?.message?.includes('verified') ||
                        apiData?.error === 'EmailNotVerified')
                ) {
                    setIsEmailUnverified(true);
                    setUnverifiedEmail(data.email);
                }
            },
        });
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
                                    Your email address is not verified. Please
                                    check your inbox or click below to resend.
                                </p>
                            </div>
                            <div className="mt-4">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => resendVerification.mutate()}
                                    disabled={resendVerification.isPending}
                                >
                                    {resendVerification.isPending
                                        ? 'Sending...'
                                        : 'Resend Verification'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                data-testid="login-form"
            >
                <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="mt-1">
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="mt-1">
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
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
                        <span className="bg-white px-2 text-gray-500">Or</span>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                    <Link
                        to={paths.auth.register.getHref()}
                        className="text-center"
                    >
                        Register
                    </Link>
                    <Link
                        to={paths.auth.forgotPassword.getHref()}
                        className="text-center"
                    >
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

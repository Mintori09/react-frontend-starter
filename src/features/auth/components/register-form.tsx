import * as React from 'react';
import { useRegister } from '@/lib/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useNotifications } from '@/components/ui/notifications';

type RegisterFormProps = {
    onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
    const { addNotification } = useNotifications();
    const register = useRegister({
        onSuccess: () => {
            addNotification({
                type: 'success',
                title: 'Success',
                message: 'Account created successfully',
            });
            onSuccess();
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const passwordConfirmed = formData.get('passwordConfirmed') as string;

        if (password !== passwordConfirmed) {
            addNotification({
                type: 'error',
                title: 'Error',
                message: "Passwords don't match",
            });
            return;
        }

        register.mutate({ username, email, password, passwordConfirmed });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="username">Username</Label>
                    <div className="mt-1">
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                        />
                    </div>
                </div>

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
                            autoComplete="new-password"
                            required
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="passwordConfirmed">Confirm Password</Label>
                    <div className="mt-1">
                        <Input
                            id="passwordConfirmed"
                            name="passwordConfirmed"
                            type="password"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={register.isPending}
                    >
                        {register.isPending ? 'Creating Account...' : 'Register'}
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
                            Already have an account?
                        </span>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link to={paths.auth.login.getHref()}>
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

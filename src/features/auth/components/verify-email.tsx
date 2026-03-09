import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '@/lib/auth';
import { Spinner } from '@/components/ui/spinner';
import { Link } from 'react-router';
import { paths } from '@/config/paths';
import { Button } from '@/components/ui/button';

type VerifyEmailProps = {
    token: string;
};

export const VerifyEmail = ({ token }: VerifyEmailProps) => {
    const mutation = useMutation({
        mutationFn: () => verifyEmail(token),
    });

    React.useEffect(() => {
        mutation.mutate();
    }, [token]);

    if (mutation.isPending) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <Spinner size="lg" className="mb-4" />
                <p>Verifying your email...</p>
            </div>
        );
    }

    if (mutation.isError) {
        const error = mutation.error as any;
        return (
            <div className="text-center p-8">
                <h3 className="text-lg font-bold text-red-600 mb-2">Verification Failed</h3>
                <p className="mb-6">{error?.response?.data?.message || 'The verification link is invalid or has expired.'}</p>
                <Link to={paths.auth.login.getHref()}>
                    <Button>Back to login</Button>
                </Link>
            </div>
        );
    }

    if (mutation.isSuccess) {
        return (
            <div className="text-center p-8">
                <h3 className="text-lg font-bold text-green-600 mb-2">Email Verified!</h3>
                <p className="mb-6">Your email has been successfully verified. You can now log in.</p>
                <Link to={paths.auth.login.getHref()}>
                    <Button>Log in</Button>
                </Link>
            </div>
        );
    }

    return null;
};

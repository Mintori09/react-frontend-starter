import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="flex flex-col items-center gap-4 text-center">
                <ShieldAlert size={64} className="text-red-500" />
                <h1 className="text-3xl font-bold text-gray-800">403 - Unauthorized</h1>
                <p className="text-gray-600 max-w-md">
                    You do not have permission to access this page. Please check your
                    account or contact the administrator.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedPage;



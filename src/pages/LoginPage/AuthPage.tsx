import { useState } from "react";
import { AuthForm } from "./components/AuthForm";
import { api } from "../../utils/api";
import axios from "axios";

const AuthPage = () => {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [error, setError] = useState<string>("")

    const handleSubmit = async (payload: { email: string; password: string }) => {
        const endpoint =
            mode === "login"
                ? "/auth/login"
                : "/auth/register";

        try {
            const response = await api.post(endpoint, payload);
            setError(response.data)

            // alert('✅ Success:\n' + JSON.stringify(response.data));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message;
                if (message) {
                    setError(message.split('\n').join('\n'));
                } else {
                    setError("Đã có lỗi xảy ra từ máy chủ.");
                }
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Lỗi không xác định.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {error && (
                    <p className="text-red-600 mt-2 text-sm whitespace-pre-line">
                        {error}
                    </p>
                )}
                <AuthForm mode={mode} onSubmit={handleSubmit} />
                <div className="mt-4 text-center">
                    {mode === "login" ? (
                        <p>
                            Don’t have an account?{" "}
                            <button
                                className="text-blue-500 underline"
                                onClick={() => setMode("register")}
                            >
                                Register
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button
                                className="text-blue-500 underline"
                                onClick={() => setMode("login")}
                            >
                                Login
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;

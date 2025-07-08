import { useState } from "react";
import { AuthForm } from "./components/AuthForm";
import { api } from "../../utils/api";

const AuthPage = () => {
    const [mode, setMode] = useState<"login" | "register">("login");

    const handleSubmit = async (data: { email: string; password: string }) => {
        const endpoint =
            mode === "login"
                ? "/auth/login"
                : "/auth/register";

        try {
            // const response = await fetch(endpoint, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     credentials: "include",
            //     body: JSON.stringify(data),
            // });
            const response = await api.post(endpoint, JSON.stringify(data))

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Request failed");
            }

            const result = await response.json();
            console.log("✅ Success:", result.data);
        } catch (err) {
            console.error("❌ Error:", err);
            alert("Login/Register failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
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

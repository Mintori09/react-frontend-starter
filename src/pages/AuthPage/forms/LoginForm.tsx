import { useState } from "react";
import Button from "../../../components/elements/Button";
import { Link } from "react-router-dom";
import InputField from "../../../components/elements/InputField";
import { toast } from "react-hot-toast";
import { api } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";
import type { FilterUser } from "../../../types/User";
import Spinner from "../../../components/Spinner";
import { getErrorMessage } from "../../../utils/error";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false)
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            // 1. Gửi thông tin đăng nhập
            await api.post("/auth/login", { email, password });

            // 2. Lấy thông tin user đã đăng nhập
            const res = await api.get("/users/me");
            const data: FilterUser = res.data.user;

            // 3. Gọi redux login để lưu vào state
            login(data);

            toast.success("Login successful!");
        } catch (err) {
            console.error(err);
            toast.error(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? <Spinner /> :
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Welcome Back
                </h2>
                <p className="text-sm text-center text-gray-500 mb-2">
                    Please enter your credentials
                </p>

                <InputField
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" variant="primary">
                    Login
                </Button>

                <div className="text-sm text-center text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </div>
                <div className="text-sm text-center text-gray-600">
                    <Link to="/forgot-password" className="text-blue-600 hover:underline">
                        Forgot Password
                    </Link>
                </div>

            </form>
    );
};



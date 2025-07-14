import { useState } from "react";
import Button from "../../../components/elements/Button";
import { Link } from "react-router-dom";
import InputField from "../../../components/elements/InputField";
import { toast } from "react-hot-toast";
import { api } from "../../../utils/api";
import Spinner from "../../../components/Spinner";
import { getErrorMessage } from "../../../utils/error";

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.post('/auth/forgot-password', { email });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            setLoading(false)
            toast.error(getErrorMessage(error))
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? <Spinner /> :
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Forgot Password
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

                <Button type="submit" variant="primary">
                    Send Email
                </Button>

                <div className="text-sm text-center text-gray-600">
                    Remember an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>
            </form>
    );
};





import { useEffect, useState } from "react";
import Button from "../../../components/elements/Button";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/elements/InputField";
import { toast } from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import { api } from "../../../utils/api";
import { getErrorMessage } from "../../../utils/error";

interface RegisterType {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export const RegisterForm = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [payload, setPayload] = useState<RegisterType>();
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    useEffect(() => {
        setPayload({ email, password, confirmPassword, name })
    }, [email, password, email, confirmPassword])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await api.post("/auth/register", payload);
            const message = res.message;

            toast.success(message)
            navigate("/home")
        } catch (err) {
            setLoading(false)
            toast.error(getErrorMessage(err));
            console.log(err)
        } finally {
            setLoading(false)
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
                    type="text"
                    name="full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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

                <InputField
                    type="password"
                    name="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button type="submit" variant="primary">
                    Login
                </Button>

                <div className="text-sm text-center text-gray-600">
                    Having an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>
            </form>
    );
};





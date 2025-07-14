import { useState } from "react";
import InputField from "../../../components/elements/InputField";
import Button from "../../../components/elements/Button";
import { toast } from "react-hot-toast";
import { api } from "../../../utils/api";
import Spinner from "../../../components/Spinner";
import { useLocation, useNavigate } from "react-router-dom";

export const ResetPasswordForm = () => {
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = query.get("token");

        if (!newPassword || !newPasswordConfirm) {
            setError("Both fields are required.");
            toast.error("Please fill in all fields.");
            return;
        }

        if (newPassword !== newPasswordConfirm) {
            setError("Passwords do not match.");
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post('/auth/reset-password', { token, newPassword, newPasswordConfirm });
            toast.success(response.message)

            navigate("/home")

        } catch (error) {
            console.error(error);

            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? <Spinner /> :
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Reset Password
                </h2>

                <InputField
                    type="password"
                    name="password"
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={error && !newPassword ? error : ""}
                />

                <InputField
                    type="password"
                    name="confirmPassword"
                    label="Confirm New Password"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    error={error && newPassword !== newPasswordConfirm ? error : ""}
                />

                <Button type="submit" variant="primary">
                    Reset Password
                </Button>
            </form>
    );
};

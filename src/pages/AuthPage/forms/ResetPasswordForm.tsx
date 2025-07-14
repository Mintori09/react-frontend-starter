import { useState } from "react";
import InputField from "../../../components/elements/InputField";
import Button from "../../../components/elements/Button";
import { toast } from "react-hot-toast";

export const ResetPasswordForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setError("Both fields are required.");
            toast.error("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            toast.error("Passwords do not match.");
            return;
        }

        setError("");
        toast.success("Password reset successful!");
        // TODO: Call API to actually reset password
    };

    return (
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error && !password ? error : ""}
            />

            <InputField
                type="password"
                name="confirmPassword"
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={error && password !== confirmPassword ? error : ""}
            />

            <Button type="submit" variant="primary">
                Reset Password
            </Button>
        </form>
    );
};

import React, { useState } from "react";

interface Props {
    mode: "login" | "register";
    onSubmit: (data: { name: string, confirmPassword: string, email: string; password: string }) => void;
}

export const AuthForm = ({ mode, onSubmit }: Props) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ email, password, name, confirmPassword });
    };

    return (
        <form onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">
                {mode === "login" ? "Login" : "Register"}
            </h2>

            {mode === "register" && (
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Fullname"
                    className="w-full mb-3 px-4 py-2 border rounded-lg"
                    required
                />
            )}

            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="w-full mb-3 px-4 py-2 border rounded-lg"
                required
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                required
            />

            {mode === "register" && <input
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full mb-3 px-4 py-2 border rounded-lg"
                required
            />}

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
                {mode === "login" ? "Login" : "Register"}
            </button>
        </form>
    );
};

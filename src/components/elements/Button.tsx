import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
    className?: string;
};

export default function Button({
    children,
    type = "button",
    onClick,
    variant = "primary",
    disabled = false,
    className = "",
}: ButtonProps) {
    const base =
        "w-full font-medium py-2 rounded-lg transition duration-200 focus:outline-none";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
        danger: "bg-red-600 hover:bg-red-700 text-white",
    };

    const combined = `${base} ${variants[variant]} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combined + (disabled ? " opacity-50 cursor-not-allowed" : "")}
        >
            {children}
        </button>
    );
}


import { useState } from "react";

type InputFieldProps = {
    type: "text" | "email" | "password" | "number" | "tel" | "url" | "date";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
};

export default function InputField({
    type,
    value,
    onChange,
    error,
    label,
    name,
    placeholder,
    required = true,
}: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const defaultPlaceholder = placeholder ?? {
        email: "you@example.com",
        password: "••••••••",
        text: "Enter text",
        number: "Enter number",
        tel: "Phone number",
        url: "https://example.com",
        date: "YYYY-MM-DD",
    }[type];

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label ?? name ?? type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={defaultPlaceholder}
                    required={required}
                    className={`w-full px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center text-sm text-blue-600 hover:underline"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}



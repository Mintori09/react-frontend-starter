import { useState } from "react";

type FloatFormProps = {
    title?: string;
    children: React.ReactNode;
};

export default function FloatForm({ title, children }: FloatFormProps) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleClose = () => setVisible(false);

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={handleClose}
        >
            <div
                className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
                    onClick={handleClose}
                >
                    ×
                </button>
                {title && (
                    <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </div>
    );
}



const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center px-4">
            <div className="bg-white p-10 rounded-3xl max-w-xl w-full text-center">
                <h1 className="text-4xl font-bold text-green-700 mb-4">Contact Us</h1>
                <p className="text-gray-600 text-lg mb-6">
                    Got a question or feedback? We'd love to hear from you.
                </p>
                <div className="w-24 h-1 bg-green-500 mx-auto mb-6 rounded" />
                <p className="text-gray-500 text-sm">
                    You can reach us via email at{" "}
                    <span className="text-blue-600 font-medium">support@example.com</span>
                </p>
            </div>
        </div>
    );
};

export default ContactPage;



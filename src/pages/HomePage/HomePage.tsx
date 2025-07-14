const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
            <div className="bg-white p-10 rounded-3xl max-w-xl w-full text-center">
                <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
                    Welcome to Our App
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                    This is a beautiful and clean landing page. We're glad you're here!
                </p>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded" />
                <p className="text-gray-500 text-sm">
                    Start building your amazing project now. Stay focused. Stay creative.
                </p>
            </div>
        </div>
    );
};

export default HomePage;



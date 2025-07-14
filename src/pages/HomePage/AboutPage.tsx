const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 flex items-center justify-center px-4">
            <div className="bg-white p-10 rounded-3xl max-w-xl w-full text-center">
                <h1 className="text-4xl font-bold text-purple-700 mb-4">About Us</h1>
                <p className="text-gray-600 text-lg mb-6">
                    We are a passionate team building beautiful and user-friendly
                    applications. Our mission is to create great digital experiences.
                </p>
                <div className="w-24 h-1 bg-purple-500 mx-auto mb-6 rounded" />
                <p className="text-gray-500 text-sm">
                    Thanks for visiting! We hope you enjoy using our app.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;

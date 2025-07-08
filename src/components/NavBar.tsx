import { useState } from "react";
import { Link } from "react-router-dom"; // optional if using React Router
import { Menu, X } from "lucide-react"; // requires lucide-react or use SVGs

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 text-xl font-bold text-blue-600">
                        <Link to="/">MyApp</Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">
                            Home
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600">
                            Contact
                        </Link>
                        <Link
                            to="/login"
                            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu}>
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu panel */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow">
                    <Link to="/" className="block text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link to="/about" className="block text-gray-700 hover:text-blue-600">
                        About
                    </Link>
                    <Link to="/contact" className="block text-gray-700 hover:text-blue-600">
                        Contact
                    </Link>
                    <Link
                        to="/login"
                        className="block bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

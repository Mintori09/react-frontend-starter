import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth"; // nếu đã có

const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/users", label: "Users" },
];

const Navbar = () => {
    useEffect(() => {

    }, [])
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 text-xl font-bold text-blue-600">
                        <Link to="/">MyApp</Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="text-gray-700 hover:text-blue-600"
                            >
                                {item.label}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        )}
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
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="block text-gray-700 hover:text-blue-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {isAuthenticated ? (
                        <>
                            <span className="block text-sm text-gray-600">
                                Hi, {user?.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left text-red-500 hover:underline"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="block bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;



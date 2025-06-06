import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styling/navbar.css";
import { FaShoppingCart } from "react-icons/fa"; 

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    const handleNavHash = (hash) => (e) => {
        e.preventDefault();
        setIsOpen(false);
        // Always navigate, even if already on /
        navigate(`/#${hash}`, { replace: false });
    };

    // Update cart count from localStorage and poll for changes in same tab
    useEffect(() => {
        function updateCount() {
            const stored = localStorage.getItem("cart");
            const cart = stored ? JSON.parse(stored) : [];
            const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            setCartCount(count);
        }
        updateCount();
        window.addEventListener("storage", updateCount);
        const interval = setInterval(updateCount, 500); // Poll for changes in same tab
        return () => {
            window.removeEventListener("storage", updateCount);
            clearInterval(interval);
        };
    }, []);

      
    // Refresh page when Home or Logo is clicked
    const handleHomeRefresh = (e) => {
        e.preventDefault();
        window.location.href = "/";
    };

   return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-black-600"
                        >
                            Agagwo&apos;s
                        </Link>
                    </div>
                    {/* Desktop Menu */}
                     <div className="hidden md:flex space-x-20">
                        <Link to="/" className="nav-link">Home</Link>
                        <a href="/#shop" className="nav-link" onClick={handleNavHash("shop")}>Shop</a>
                        <a href="/#about" className="nav-link" onClick={handleNavHash("about")}>About</a>
                        <a href="/#contact" className="nav-link" onClick={handleNavHash("contact")}>Contact</a>
                    </div>
                    {/* Cart Icon */}
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative">
                            <FaShoppingCart className="text-2xl text-gray-700 hover:text-blue-600" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            className="md:hidden text-gray-700 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
               <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow">
                <Link
                to="/"
                className="block nav-link"
                onClick={() => setIsOpen(false)}
                >
                Home
                </Link>
                <a href="/#shop" className="block nav-link" onClick={handleNavHash("shop")}>Shop</a>
                <a href="/#about" className="block nav-link" onClick={handleNavHash("about")}>About</a>
                <a href="/#contact" className="block nav-link" onClick={handleNavHash("contact")}>Contact</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
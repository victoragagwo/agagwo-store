import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styling/home.css";
import About from "./about";
import Contact from "./contact";
import Shop from "./shop";


function Home() {
    const location = useLocation();

useEffect(() => {
    if (location.hash) {
        let tries = 0;
        function scrollToHash() {
            const el = document.getElementById(location.hash.replace("#", ""));
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                // Check again after a short delay in case content pushes it away
                setTimeout(() => {
                    const el2 = document.getElementById(location.hash.replace("#", ""));
                    if (el2) el2.scrollIntoView({ behavior: "smooth" });
                }, 600);
            } else if (tries < 50) { // more tries
                tries++;
                setTimeout(scrollToHash, 100);
            }
        }
        scrollToHash();
    }
}, [location.hash, location.key]);

return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-16 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Agagwo&apos;s</h1>
                <p className="mb-8 text-lg md:text-xl">Discover the best deals on the latest products!</p>
                <Link to="/#shop" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-blue-50 transition">
                    Shop Now
                </Link>
            </section>

            <section id="shop">
            <Shop />
            </section>

            <section id="about">
            <About />
            </section>

            <section id="contact">
            <Contact />
            </section>
        </div>
    );
}

export default Home;
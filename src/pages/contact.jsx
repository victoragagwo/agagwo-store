import "../styling/contact.css";
import { useState } from "react";

function Contact() {
    const [toast, setToast] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setToast("Message sent! We'll get back to you soon.");
        setTimeout(() => setToast(""), 2000);
        e.target.reset();
    };

    return (
        <>
            <section className="bg-white py-12 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-4 text-blue-600">Contact Us</h2>
                    <p className="mb-4 text-gray-700">
                        We'd love to hear from you! For questions, feedback, or support, please email us at:
                    </p>
                    <a href="mailto:victoragagwo8@gmail.com" className="block mb-6 text-blue-600 underline font-medium">
                        victoragagwo8@gmail.com
                    </a>
                    {toast && (
                        <div className="contact-toast-notification">
                            {toast}
                        </div>
                    )}
                    <form className="contact-form max-w-2xl mx-auto justify-center items-center" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="contact-input"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="contact-input"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            className="contact-textarea"
                            rows={3}
                            required
                        />
                        <button
                            type="submit"
                            className="contact-btn"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Contact;
import "../styling/cart.css";
import { useState, useEffect } from "react";

function Cart() {
    const [cart, setCart] = useState([]);
    const [toast, setToast] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        setCart(stored ? JSON.parse(stored) : []);
    }, []);

    const updateQuantity = (id, delta) => {
        const updatedCart = cart.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeFromCart = (id) => {
        const item = cart.find(i => i.id === id);
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setToast(`${item?.title || "Item"} removed from cart`);
        setTimeout(() => setToast(""), 2000);
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    const total = cart.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Cart</h1>
            {toast && (
                <div className="cart-toast-notification">
                    {toast}
                </div>
            )}
            {cart.length === 0 ? (
                <div className="cart-empty">Your cart is empty.</div>
            ) : (
                <>
                    <ul className="cart-list">
                        {cart.map(item => (
                            <li key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h3 className="cart-item-title">{item.title}</h3>
                                    <p className="cart-item-price">${item.price}</p>
                                    <div className="cart-quantity">
                                        <button
                                            className="cart-qty-btn"
                                            onClick={() => updateQuantity(item.id, -1)}
                                            disabled={(item.quantity || 1) <= 1}
                                        >-</button>
                                        <span className="cart-qty-value">{item.quantity || 1}</span>
                                        <button
                                            className="cart-qty-btn"
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >+</button>
                                    </div>
                                </div>
                                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <span className="cart-total">Total: ${total.toFixed(2)}</span>
                        <button className="cart-clear-btn" onClick={clearCart}>Clear Cart</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
import React, { useEffect, useState } from "react";
import "../styling/shop.css";
import { Link } from "react-router-dom";

const API_URL_1 = import.meta.env.VITE_PRODUCTS_API;
const API_URL_2 = import.meta.env.VITE_PRODUCTS_API2;

function Shop() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState("");
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const productsPerPage = 12;

  useEffect(() => {
    Promise.all([
      fetch(API_URL_1).then(res => res.json()),
      fetch(API_URL_2).then(res => res.json())
    ])
      .then(([data1, data2]) => {
        const normalizedData2 = data2.map(item => ({
          id: `escuelajs-${item.id}`,
          title: item.title,
          price: item.price,
          image: Array.isArray(item.images) ? item.images[0] : item.images,
        }));
        setProducts([...data1, ...normalizedData2]);
      })
      .catch(() => setProducts([]));
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIdx, startIdx + productsPerPage);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setToast(`${product.title} added to cart!`);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="shop-container bg-gray-50 min-h-screen py-10">
      {toast && (
        <div className="shop-toast-notification">
          {toast}
        </div>
      )}
      <h1 className="shop-title text-3xl font-bold text-center mb-8">Shop All Products</h1>
      <div className="shop-grid grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {currentProducts.map(product => (
          <div key={product.id} className="shop-card bg-white rounded-lg shadow transition p-4 flex flex-col items-center">
            <img src={product.image} alt={product.title} className="w-40 h-40 object-contain rounded mb-4" />
            <h3 className="text-base md:text-lg font-semibold mb-2 text-center w-full truncate" title={product.title}>
              {product.title}
            </h3>
            <p className="text-blue-600 font-bold mb-4">${product.price}</p>
            <button
              className="shop-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <Link
              to={`/product/${product.id}`}
              className="text-blue-600 hover:underline mt-2"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination flex justify-center items-center gap-2 mt-10">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`pagination-btn px-3 py-1 rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Shop;
import "../styling/details.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL_1 = import.meta.env.VITE_PRODUCTS_API;
const API_URL_2 = import.meta.env.VITE_PRODUCTS_API2;

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [source, setSource] = useState("");
  const [toast, setToast] = useState("");
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    let fetchUrl, isEscuela = false;
    if (id.startsWith("escuelajs-")) {
      fetchUrl = `${API_URL_2}/${id.replace("escuelajs-", "")}`;
      isEscuela = true;
    } else {
      fetchUrl = `${API_URL_1}/${id}`;
    }
    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        if (isEscuela) {
          setProduct({
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.description,
            image: Array.isArray(data.images) ? data.images[0] : data.images,
            category: data.category?.name || "",
          });
          setSource("escuelajs");
        } else {
          setProduct({
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.description,
            image: data.image,
            category: data.category,
          });
          setSource("fakestore");
        }
      })
      .catch(() => setProduct(null));
  }, [id]);

  const addToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setToast(`${product.title} added to cart!`);
    setTimeout(() => setToast(""), 2000);
  };

  if (!product) {
    return (
      <div className="details-container">
        <div className="details-loading">Loading product details...</div>
      </div>
    );
  }

  return (
    <div className="details-container">
      {toast && (
        <div className="details-toast-notification">
          {toast}
        </div>
      )}
      <div className="details-card">
        <img src={product.image} alt={product.title} className="details-image" />
        <div className="details-info">
          <h1 className="details-title">{product.title}</h1>
          <p className="details-category">{product.category}</p>
          <p className="details-price">${product.price}</p>
          <p className="details-description">{product.description}</p>
          <button className="details-addcart" onClick={addToCart}>Add to Cart</button>
          <button
            className="details-back"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
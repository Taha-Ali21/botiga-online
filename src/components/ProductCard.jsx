import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../App.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <div className="product-image">
        {/* Add image here if you have one */}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.nom}</h3>
        <p className="product-description">{product.descripcio}</p>
        <div className="product-price">${product.preu}</div>
        <button 
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
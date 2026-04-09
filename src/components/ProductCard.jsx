import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../App.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  // This approach safely accesses either format
  const name = product.nom || product.name;
  const description = product.descripcio || product.description;
  const price = product.preu || product.price;
  const image = product.imatge || product.image;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        
        <div className="product-price">{price}€</div>

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
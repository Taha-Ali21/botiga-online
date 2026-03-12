import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../App.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.preu, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
      </div>
      
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="cart-item-info">
            <div className="cart-item-name">{item.nom}</div>
            <div className="cart-item-price">${item.preu}</div>
          </div>
          <button 
            className="cart-item-remove"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
      
      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
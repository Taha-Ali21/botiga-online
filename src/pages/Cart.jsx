import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../App.css";

const Cart = () => {
  const { cart, removeFromCart, calculateTotal } = useContext(CartContext);

  const total = calculateTotal();

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

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          
          {/* ✅ Product Image */}
          <img
            src={item.imatge}
            alt={item.nom}
            className="cart-item-image"
            width="100"
          />

          <div className="cart-item-info">
            <div className="cart-item-name">{item.nom}</div>
            <div className="cart-item-price">
              ${Number(item.preu).toFixed(2)}
            </div>

            {/* ✅ Quantity */}
            <div className="cart-item-quantity">
              Quantity: {item.quantity}
            </div>
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

      {/* ✅ Extra buttons */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const location = useLocation();
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      padding: "0 2rem",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    }}>

      {/* Logo */}
      <Link to="/" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        textDecoration: "none",
        fontWeight: "600",
        fontSize: "18px",
        color: "#1a1a1a",
      }}>
        <span style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#2d5a35",
          display: "inline-block",
        }} />
        Botiga Online
      </Link>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <Link to="/" style={{
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: location.pathname === "/" ? "600" : "400",
          color: location.pathname === "/" ? "#1a1a1a" : "#6b7280",
          padding: "6px 12px",
          borderRadius: "8px",
          background: location.pathname === "/" ? "#f3f4f6" : "transparent",
          transition: "all 0.15s",
        }}>
          Home
        </Link>

        {/* Cart Button */}
        <Link to="/cart" style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          borderRadius: "20px",
          background: "#2d5a35",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "500",
          transition: "background 0.15s",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Cart
          {cartCount > 0 && (
            <span style={{
              background: "#f0c040",
              color: "#2c1f00",
              fontSize: "11px",
              fontWeight: "600",
              borderRadius: "10px",
              padding: "1px 7px",
              minWidth: "18px",
              textAlign: "center",
            }}>
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

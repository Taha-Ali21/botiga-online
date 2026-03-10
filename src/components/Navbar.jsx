import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      padding: "1rem",
      backgroundColor: "#333",
      color: "white",
      display: "flex",
      gap: "2rem"
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>Cart</Link>
    </nav>
  );
};

export default Navbar;
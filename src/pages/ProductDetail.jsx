import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import "../App.css";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        {/* Add image here if you have one */}
      </div>
      <div className="product-detail-info">
        <h1>{product.nom}</h1>
        <div className="product-detail-price">${product.preu}</div>
        <p className="product-detail-description">{product.descripcio}</p>
        <Link to="/" className="back-button">Back to Home</Link>
        <Link to="/cart" className="continue-shopping">View Cart</Link>
      </div>
    </div>
  );
};

export default ProductDetail;
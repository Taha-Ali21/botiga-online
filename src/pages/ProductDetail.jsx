// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenirProductePerId } from "../services/productservice";
import { useCart } from "../context/CartContext";
import "../App.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await obtenirProductePerId(id);
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Add product multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      // Show success message or navigate to cart
      alert(`${quantity} ${product.name} added to cart!`);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={goBack} className="back-btn">
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <button onClick={goBack} className="back-btn">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={goBack} className="back-btn">
        ← Back
      </button>
      
      <div className="product-detail">
        <div className="product-detail-image">
          <img 
            src={product.image || product.imatge || "/placeholder.jpg"} 
            alt={product.name || product.nom}
          />
        </div>
        
        <div className="product-detail-info">
          <h1>{product.name || product.nom}</h1>
          
          {product.category && (
            <p className="product-category">
              Category: {product.category || product.categoria}
            </p>
          )}
          
          <p className="product-description">
            {product.description || product.descripcio}
          </p>
          
          <div className="product-price-section">
            <span className="product-price-label">Price:</span>
            <span className="product-price">
              ${product.price || product.preu}
            </span>
          </div>
          
          {product.stock && (
            <p className="product-stock">
              In Stock: {product.stock} units
            </p>
          )}
          
          <div className="product-quantity">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="quantity-btn"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart} 
            className="add-to-cart-btn"
          >
            🛒 Add to Cart ({quantity} {quantity === 1 ? 'item' : 'items'})
          </button>
          
          {product.features && (
            <div className="product-features">
              <h3>Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { obtenirProductes, obtenirProductesDestacats } from "../services/productservice";
import "../App.css";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const [allProducts, featured] = await Promise.all([
          obtenirProductes(),
          obtenirProductesDestacats(4),
        ]);

        setProducts(allProducts);
        setFeaturedProducts(featured);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Products</h2>
        <p>{error}</p>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="app-container">
      <section className="hero">
        <div className="hero-box">
          <h2 className="welcome-text">Welcome to Botiga Online</h2>
          <p>Discover our amazing products at great prices!</p>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="featured-section">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="all-products-section">
        <h2 className="section-title">All Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "../App.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Botiga Online</h1>
        <p>Discover amazing products at great prices!</p>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Product Detail Page</h1>
      <p>Viewing product with ID: {id}</p>
    </div>
  );
};

export default ProductDetail;
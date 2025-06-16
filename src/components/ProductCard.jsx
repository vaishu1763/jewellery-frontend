import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #e2c275", borderRadius: "8px", padding: "16px", margin: "10px", width: "200px" }}>
      <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <Link to={`/products/${product.id || product._id}`}>
        <button style={{ background: "#7b5e2e", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "5px" }}>
          View Details
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
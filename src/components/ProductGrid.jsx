import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {products.map(product => (
        <ProductCard product={product} key={product._id || product.id} />
      ))}
    </div>
  );
}
export default ProductGrid;
function ProductFilters({ onFilter }) {
  return (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      {/* Replace with real filter logic and options */}
      <select onChange={e => onFilter(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Gold">Gold</option>
        <option value="Diamond">Diamond</option>
        <option value="Silver">Silver</option>
      </select>
    </div>
  );
}
export default ProductFilters;
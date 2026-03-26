function DynamicGrid({ height, width }) {
  const rows = height;
  const columns = width;
  return (
    <div
      className="container grid"
      style={{ "--rows": rows, "--cols": columns }}
    >
      {[...Array(height * width).keys()].map((_, i) => (
        <div key={i} className="box">
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export default DynamicGrid;

function DynamicGrid({ height, width }) {
  const rows = height;
  const columns = width;
  return (
    <div
      className="container justify-content-center grid"
      style={{ "--rows": rows, "--cols": columns }}
    >
      {[...Array(height * width).keys()].map((_, i) => (
        <div key={i} className="box">
          <button className="btn w-100 h-100 btn-outline-primary nav-link active">
            {i + 1}{" "}
          </button>
        </div>
      ))}
    </div>
  );
}

export default DynamicGrid;

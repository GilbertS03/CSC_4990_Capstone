import { useState } from "react";
function SearchBar({ data, setFilteredData, fields }) {
  const [searchField, setSearchField] = useState(fields[0].key);
  const [query, setQuery] = useState("");

  const currentField = fields.find((f) => f.key === searchField);

  const handleReset = () => {
    setSearchField(fields[0].key);
    setQuery("");
    setFilteredData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filtered = Object.values(data).filter((item) => {
      const value = item[searchField];
      if (!value) return false;

      if (typeof value === "string") {
        return value.toLowerCase().includes(query.toLowerCase());
      }

      return value.toString().includes(query);
    });

    const filteredObj = {};
    filtered.forEach((item) => (filteredObj[item.id ?? item.deviceId] = item));

    setFilteredData(filteredObj);
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <form className="d-flex" onSubmit={handleSubmit}>
          {currentField.type === "select" ? (
            <select
              className="form-select me-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            >
              <option value="">Select</option>
              {currentField.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          <select
            className="form-select me-2"
            value={searchField}
            onChange={(e) => {
              setSearchField(e.target.value);
              setQuery("");
            }}
          >
            {fields.map((field) => (
              <option key={field.key} value={field.key}>
                {field.label}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" type="submit">
            Search
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </form>
      </div>
    </nav>
  );
}

export default SearchBar;

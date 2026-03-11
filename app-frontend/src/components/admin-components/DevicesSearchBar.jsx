import { useState } from "react";
function DevicesSearchBar({ devices, setFilteredDevices }) {
  const [searchType, setSearchType] = useState("Device ID");
  const [query, setQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setQuery("");
    setStatusQuery("");
  };

  const handleReset = () => {
    setSearchType("Device ID");
    setQuery("");
    setStatusQuery("");
    setFilteredDevices(devices);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filtered = Object.values(devices).filter((device) => {
      if (searchType === "Device Status") {
        return device.deviceStatus === statusQuery;
      } else if (searchType === "Device ID") {
        return device.deviceId.toString().includes(query);
      } else if (searchType === "Device Type") {
        return device.deviceType.toLowerCase().includes(query.toLowerCase());
      } else if (searchType === "Room ID") {
        return device.roomId.toString().includes(query);
      }
      return true;
    });

    const filteredObj = {};
    filtered.forEach((d) => (filteredObj[d.deviceId] = d));

    setFilteredDevices(filteredObj);
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <form className="d-flex" onSubmit={handleSubmit}>
          {searchType === "Device Status" ? (
            <select
              className="form-select me-2"
              value={statusQuery}
              onChange={(e) => setStatusQuery(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="available">available</option>
              <option value="unavailable">unavailable</option>
            </select>
          ) : (
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          <select
            className="form-select me-2"
            value={searchType}
            onChange={handleSearchTypeChange}
          >
            <option>Device ID</option>
            <option>Device Type</option>
            <option>Room ID</option>
            <option>Device Status</option>
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

export default DevicesSearchBar;

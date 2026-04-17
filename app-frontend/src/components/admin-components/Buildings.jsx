import { useEffect, useState } from "react";
import { getAllBuildings, deleteBuilding } from "../../services/api/admin";
import { NavLink } from "react-router-dom";

function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await getAllBuildings();
        setBuildings(res.data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  const handleDelete = async (id) => {
    if (confirm(`Delete Building: ${id}?`)) {
      try {
        setLoading(true);
        const res = await deleteBuilding(id);
        setBuildings((prev) => prev.filter((b) => b.buildingId !== id)); // ← remove from state
        console.log(res);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  };

  if (loading) return <p>Loading... </p>;
  if (error) return <p>Error Loading Data. Please try again</p>;

  return (
    <div className="container text-center">
      <h1>All Buildings</h1>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Building Name</th>
            <th>Building Number</th>
            <th>Edit Building</th>
            <th>Delete Building</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(buildings).map((key) => (
            <tr key={key}>
              <td>{buildings[key].buildingName}</td>
              <td>{buildings[key].buildingId}</td>
              <td>
                <NavLink
                  className="btn btn-sm btn-primary"
                  to={`/admin/buildings/${buildings[key].buildingId}`}
                  end
                >
                  Edit Building: {buildings[key].buildingId}
                </NavLink>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(buildings[key].buildingId)}
                >
                  Delete: {buildings[key].buildingId}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container text-center">
        <NavLink to="/admin/buildings/create">Create Building</NavLink>
      </div>
    </div>
  );
}

export default Buildings;

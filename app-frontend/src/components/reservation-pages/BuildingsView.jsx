import { useState, useEffect } from "react";
import { getAllBuildings } from "../../services/api/user";
import { NavLink } from "react-router-dom";

function BuildingsView() {
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
            <th>View Rooms</th>
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
                  to={`${buildings[key].buildingId}`}
                  end
                >
                  View Rooms: {buildings[key].buildingId}
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default BuildingsView;

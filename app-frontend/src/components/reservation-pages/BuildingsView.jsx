import { useState, useEffect } from "react";
import { getAllBuildings, getAllBuildingHours } from "../../services/api/user";
import { NavLink } from "react-router-dom";

function BuildingsView() {
  const [buildings, setBuildings] = useState([]);
  const [buildingHours, setBuildingHours] = useState([]);
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

  useEffect(() => {
    const fetchBuildingHours = async () => {
      try {
        const res = await getAllBuildingHours();
        setBuildingHours(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBuildingHours();
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
            <th>Opening Hour</th>
            <th>Closing Hour</th>
            <th>View Rooms</th>
          </tr>
        </thead>
        <tbody>
          {buildings.map((building, index) => {
            const hours = buildingHours[index];
            return (
              <tr key={building.buildingId}>
                <td>{building.buildingName}</td>
                <td>{building.buildingId}</td>
                <td>{hours ? hours.openTime : "N/A"}</td>
                <td>{hours ? hours.closeTime : "N/A"}</td>
                <td>
                  <NavLink
                    className="btn btn-sm btn-primary"
                    to={`${building.buildingId}`}
                    end
                  >
                    View Rooms: {building.buildingId}
                  </NavLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default BuildingsView;

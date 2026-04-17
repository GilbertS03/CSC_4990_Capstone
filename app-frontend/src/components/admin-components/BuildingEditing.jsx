import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getRoomsByBuildingId } from "../../services/api/admin";

function BuildingEditing() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchRoomsByBuildingId = async (id) => {
      try {
        const res = await getRoomsByBuildingId(id);
        setRooms(res.data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomsByBuildingId(id);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Data</p>;

  return (
    <div className="container text-center">
      <h2>All Rooms for Building# : {id}</h2>
      <div>
        <NavLink to="/admin/buildings" end>
          &larr; Back
        </NavLink>
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Room ID</th>
            <th>Edit Room</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rooms).length != 0 ? (
            Object.keys(rooms).map((key) => (
              <tr key={key}>
                <td>{rooms[key].roomName}</td>
                <td>{rooms[key].roomId}</td>
                <td>
                  <NavLink
                    className="btn btn-sm btn-primary"
                    to={`/admin/buildings/${id}/${rooms[key].roomId}`}
                    end
                  >
                    Edit Room: {rooms[key].roomId}
                  </NavLink>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="container text-center">
        <NavLink to={`/admin/buildings/${id}/create-room`} end>
          Create Room
        </NavLink>
      </div>
    </div>
  );
}

export default BuildingEditing;

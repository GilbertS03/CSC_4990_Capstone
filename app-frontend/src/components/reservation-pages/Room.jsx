import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getRoomsByBuildingId, getDevices } from "../../services/api/user";

function Room() {
  const [roomsData, setRoomsData] = useState([]);
  const [availableDeviceCounts, setAvailableDeviceCounts] = useState({});
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bid } = useParams();

  useEffect(() => {
    const fetchRoomsData = async (id) => {
      try {
        const res = await getRoomsByBuildingId(id);
        setRoomsData(res.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchRoomsData(bid);
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await getDevices();
        setDevices(res.data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    fetchDevices();
  }, []);

  useEffect(() => {
    if (!devices.length || !roomsData.length) return;

    const counts = {};
    devices.forEach((device) => {
      const roomId = device.roomId;

      if (!counts[roomId]) {
        counts[roomId] = 0;
      }
      counts[roomId]++;
    });
    setAvailableDeviceCounts(counts);
    setLoading(false);
  }, [devices, roomsData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!roomsData || roomsData.length === 0) {
    return (
      <>
        <div className="container">
          <h1>No rooms to show!</h1>
          <button className="btn btn-dark ms-2 mt-2">
            <NavLink className="no-underline-link text-light" to={`/buildings`}>
              Return to List
            </NavLink>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        {roomsData.map((r) => (
          <div className="col-sm-6 mb-3 mb-sm-0 p-2" key={r.roomId}>
            <div className="card text-bg-dark">
              <div className="card-body">
                <h5 className="card-title">{r.roomName}</h5>
                <p className="card-text">
                  Remaining Available Devices:{" "}
                  {availableDeviceCounts[r.roomId] ?? "..."}
                </p>
                <button className="btn btn-secondary">
                  {" "}
                  <NavLink
                    className="no-underline-link text-light"
                    to={`/reserve/`}
                  >
                    View Devices
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-dark ms-2 mt-2">
          <NavLink className="no-underline-link text-light" to={`/buildings`}>
            Return to List
          </NavLink>
        </button>
      </div>
    </>
  );
}
export default Room;

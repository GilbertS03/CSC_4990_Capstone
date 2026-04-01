import { useState, useEffect } from "react";
import "../../App.css";
import { getDeviceLocations } from "../../services/api/admin";

function DynamicGrid({ height, width, rid, onCellClick }) {
  const rows = height;
  const columns = width;
  const [deviceObjs, setDeviceObjs] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceData = async (id) => {
      try {
        const res = await getDeviceLocations(id);
        const data = res.data;
        setDeviceObjs(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDeviceData(rid);
  }, []);

  const deviceMap = {};
  deviceObjs.forEach((device) => {
    deviceMap[`${device.positionY}-${device.positionX}`] = device;
  });

  const statusColors = {
    available: "success",
    reserved: "danger",
    unavailable: "outline-dark",
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data, try again</p>;
  return (
    <div className="container">
      <div
        className="container justify-content-center grid mt-2"
        style={{ "--rows": rows, "--cols": columns }}
      >
        {[...Array(height)].map((_, row) =>
          [...Array(width)].map((_, col) => {
            const key = `${row}-${col}`;
            const device = deviceMap[key] || { deviceStatus: "unavailable" }; // fallback
            return (
              <div key={key} className="box">
                <button
                  className={`btn btn-${statusColors[device.deviceStatus]} rounded-0 w-100 h-100 grid-button`}
                  onClick={() => onCellClick(device, row, col)}
                />
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

export default DynamicGrid;

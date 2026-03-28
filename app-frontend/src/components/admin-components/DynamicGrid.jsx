import { useState, useEffect } from "react";
import "../../App.css";
import { getDeviceLocations } from "../../services/api/admin";
import DeviceModal from "./DeviceModal";

function DynamicGrid({ height, width, rid }) {
  const rows = height;
  const columns = width;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
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
    unavailable: "dark",
  };

  const handleClick = (buttonData) => {
    setSelectedButton(buttonData);
    setIsModalOpen(true);
    console.log(buttonData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data, try again</p>;
  return (
    <div className="container">
      <div
        className="container justify-content-center grid mt-5"
        style={{ "--rows": rows, "--cols": columns }}
      >
        {[...Array(height)].map((_, row) =>
          [...Array(width)].map((_, col) => {
            const key = `${row}-${col}`;
            const device = deviceMap[key] || { status: "unavailable" }; // fallback
            return (
              <div key={key} className="box">
                <button
                  className={`btn btn-${statusColors[device.status]} rounded-0 w-100 h-100 grid-button`}
                  onClick={() => handleClick(device)}
                />
              </div>
            );
          }),
        )}
      </div>
      <div className="legend">
        green = available, black = not available (any reason besides reserved),
        red = reserved
        {/* Todo add a way to change the dimensions of the room by allowing them to access a form that will ask and validate the number */}
        <div className="edit-form">Change dimensions of room?</div>
      </div>
    </div>
  );
}

export default DynamicGrid;

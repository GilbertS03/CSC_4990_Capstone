import { getAllDevices } from "../../services/api/admin";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DevicesSearchBar from "./DevicesSearchBar";

function AdminDevices() {
  const [devices, setDevices] = useState({});
  const [filteredDevices, setFilteredDevices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getAllDevices();
        setDevices(data);
        setFilteredDevices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-primary";
      case "unavailable":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  useEffect(() => {
    Object.entries(devices).map(([key, device]) => {
      console.log(key, device);
    });
  }, [loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container d-flex flex-column justify-content-center">
      <DevicesSearchBar
        devices={devices}
        setFilteredDevices={setFilteredDevices}
      />
      <h1 className="text-center">All Devices</h1>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Device Type</th>
            <th>Room ID</th>
            <th>Device Status</th>
            <th>Edit Data</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(filteredDevices).length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                No Devices Found.
              </td>
            </tr>
          ) : (
            Object.values(filteredDevices).map((device) => (
              <tr key={device.deviceId}>
                <td>{device.deviceId}</td>
                <td>{device.deviceType}</td>
                <td>{device.roomId}</td>
                <td>
                  <span
                    className={`badge rounded-pill ${getStatusColor(device.deviceStatus)}`}
                  >
                    {device.deviceStatus}
                  </span>
                </td>
                <td>
                  <NavLink
                    to={`/admin/devices/${devices.deviceId}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit Device: {devices.deviceId}{" "}
                  </NavLink>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDevices;

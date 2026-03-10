import { getAllDevices } from "../../services/api/admin";
import { useEffect, useState } from "react";

function AdminDevices() {
  const [devices, setDevices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getAllDevices();
        setDevices(data);
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
          {Object.keys(devices).map((key) => (
            <tr key={key}>
              <td>{devices[key].deviceId}</td>
              <td>{devices[key].deviceType}</td>
              <td>{devices[key].roomId}</td>
              <td>
                <span
                  className={`badge rounded-pill ${getStatusColor(devices[key].deviceStatus)}`}
                >
                  {devices[key].deviceStatus}
                </span>
              </td>
              <td>Edit Device: {devices[key].deviceId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDevices;

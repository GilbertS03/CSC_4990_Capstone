import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  deleteDevice,
  getDeviceStatuses,
  getDeviceTypes,
  editDevice,
  getDeviceById,
} from "../../services/api/admin";
import { useState, useEffect } from "react";
//todo enforce validation on fields
//TODO fix the form now because it asks for a room id and make sure the user change it here, this is what the grid is for
//TODO come back and fix this because there is no device/edit for all features, just device positions which is not the purpose of this form
function EditDevice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [deviceStatuses, setDeviceStatuses] = useState([]);
  const [device, setDevice] = useState({});
  const [formData, setFormData] = useState({
    deviceTypeId: "",
    deviceStatusId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editDevice(id, formData);
      navigate(-1);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    const onLoad = async (id) => {
      try {
        const res1 = await getDeviceById(id);
        setDevice(res1.data);
        const res2 = await getDeviceStatuses();
        setDeviceStatuses(res2.data);
        const res3 = await getDeviceTypes();
        setDeviceTypes(res3.data);
        const matchedType = res3.data.find(
          (dt) => dt.deviceType === res1.data.deviceType,
        );
        const matchedStatus = res2.data.find(
          (ds) => ds.deviceStatus === res1.data.deviceStatus,
        );
        setFormData({
          deviceTypeId: matchedType?.deviceTypeId ?? "",
          deviceStatusId: matchedStatus?.deviceStatusId ?? "",
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    onLoad(id);
  }, [id]);

  const handleDelete = async () => {
    if (confirm(`Delete Device ${id}?`)) {
      try {
        const res = await deleteDevice(id);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        if (!error) {
          navigate(-1);
        } else {
          console.error("Error, please try again");
        }
        setError(false);
      }
    } else {
      return;
    }
  };

  if (loading || !formData) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        <NavLink to={"/admin/devices"} end>
          &larr; Back{" "}
        </NavLink>{" "}
        <br />
        Device {id} Does not Exist
      </p>
    );

  return (
    <div className="container">
      <p>
        <NavLink to={"/admin/devices"}>&larr;Go Back</NavLink>
      </p>
      <h2>Device ID: {id} </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Device Type:</label>
          <select
            id="deviceType"
            className="form-select"
            value={formData.deviceTypeId}
            onChange={(e) =>
              setFormData({ ...formData, deviceTypeId: e.target.value })
            }
          >
            {deviceTypes.map((dt) => (
              <option key={dt.deviceTypeId} value={dt.deviceTypeId}>
                {dt.deviceType}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Status:</label>
          <select
            id="deviceStatus"
            className="form-select"
            value={formData.deviceStatusId}
            onChange={(e) =>
              setFormData({ ...formData, deviceStatusId: e.target.value })
            }
          >
            {deviceStatuses.map((ds) => (
              <option key={ds.deviceStatusId} value={ds.deviceStatusId}>
                {ds.deviceStatus}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="container mt-5 text-center">
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Device {id}
        </button>
      </div>
    </div>
  );
}

export default EditDevice;

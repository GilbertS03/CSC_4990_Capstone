import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  deleteDevice,
  getDeviceStatuses,
  deviceTypes,
  editDevice,
  getDeviceById,
} from "../../services/api/admin";
import { useState } from "react";
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

  const onSubmit = (e) => {
    e.preventDefault();
    return;
  };

  // useEffect(() => {
  //   try{

  //   }
  // }, [])

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

  return (
    <div className="container">
      <p>
        <NavLink to={"/admin/devices"}>&larr;Go Back</NavLink>
      </p>
      <h2>Device ID: {id} </h2>
      <form>
        <div className="form-group mb-3">
          <label>Device Type:</label>
          <select id="deviceType" className="form-control">
            <option>Gaming PC</option>
            <option>Smart Board</option>
            <option>Desktop</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Room ID:</label>
          <input
            id="roomID"
            className="form-control"
            type="text"
            placeholder="STPH109"
          />
        </div>
        <div className="form-group mb-3">
          <label>Status:</label>
          <select id="deviceStatus" className="form-control">
            <option>available</option>
            <option>unavailable</option>
          </select>
        </div>
        <button className="btn btn-primary">Submit</button>
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

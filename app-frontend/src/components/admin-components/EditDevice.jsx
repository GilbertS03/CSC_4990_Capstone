import { useParams } from "react-router-dom";
//todo enforce validation on fields
function EditDevce() {
  const onSubmit = (e) => {
    e.preventDefault();
    return;
  };
  const { id } = useParams();
  return (
    <div className="container">
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
    </div>
  );
}

export default EditDevce;

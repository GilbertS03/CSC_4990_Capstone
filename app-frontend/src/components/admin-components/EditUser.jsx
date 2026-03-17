import { useParams } from "react-router-dom";
//todo enforce validation on fields
function EditUser() {
  const onSubmit = (e) => {
    e.preventDefault();
    return;
  };
  // TODO finish user editing
  // TODO talk about if we want to be able to edit their email, firstname, and lastname
  const { id } = useParams();
  return (
    <div className="container">
      <h2>User ID: {id} </h2>
      <form>
        <div className="form-group mb-3">
          <label>Role:</label>
          <select id="userRole" className="form-control">
            <option>Student</option>
            <option>Esports Player</option>
            <option>Esports Coach</option>
            <option>Student Organization</option>
            <option>Faculty</option>
            <option>Library Staff</option>
            <option>Admin</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Weekly Hours Remaining:</label>
          <input
            id="weeklyHours"
            className="form-control"
            type="number"
            max="20"
            min="0"
            placeholder="10"
          />{" "}
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditUser;

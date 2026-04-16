import { useParams, useNavigate, NavLink } from "react-router-dom";
import { deleteUser, getUserById } from "../../services/api/admin";
import { useEffect, useState } from "react";
//todo enforce validation on fields
function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    return;
  };

  useEffect(() => {
    const fetchUserById = async (id) => {
      try {
        const res = await getUserById(id);
        console.log(res);
      } catch (err) {
        console.error(err);
        setError(true);
        return (
          <p>
            <NavLink to={"/admin/users"} end>
              &larr; Back{" "}
            </NavLink>{" "}
            User Does not Exist{" "}
          </p>
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUserById(id);
  }, [id]);

  // TODO check why handleDelete is not updating the table.
  const handleDelete = async () => {
    if (confirm(`Delete user ${id}?`)) {
      try {
        const res = await deleteUser(id);
        console.log(res);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        if (!error) {
          navigate(-1);
        } else {
          console.log("Error, please try again");
        }
        setError(false);
      }
    } else {
      return;
    }
  };

  if (loading) return <p>Loading...</p>;
  // TODO finish user editing
  return (
    <div className="container">
      <h2>User ID: {id} </h2>
      <form>
        <div className="form-group mb-3">
          <label>Role:</label>
          <select id="userRole" className="form-control">
            <option value={3}>Student</option>
            <option value={2}>Faculty</option>
            <option value={1}>Admin</option>
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
      <div className="container mt-5 text-center">
        <button onClick={handleDelete} className="btn btn-danger">
          Delete user {id}
        </button>
      </div>
    </div>
  );
}

export default EditUser;

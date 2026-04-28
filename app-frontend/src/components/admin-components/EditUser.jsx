import { useParams, useNavigate, NavLink } from "react-router-dom";
import { deleteUser, getUserById, updateUser } from "../../services/api/admin";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  const printErrors = (errors) => {
    Object.keys(errors).forEach((key) => {
      alert(errors[key]);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = e.target.userRole.value;
    const weeklyHours = Number(e.target.weeklyHours.value);
    const errors = validateValues(role, weeklyHours);
    if (Object.keys(errors).length !== 0) {
      printErrors(errors);
      return;
    }
    try {
      setLoading(true);
      const data = { role: role, weeklyHours: weeklyHours };
      const res = await updateUser(id, data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const validateValues = (role, weeklyHours) => {
    const errors = {};
    if (
      !role ||
      role === "" ||
      !["admin", "faculty", "student"].includes(role)
    ) {
      errors["roles"] = "Not a valid role";
    }
    if (!weeklyHours || isNaN(weeklyHours) || weeklyHours < 0) {
      errors["hours"] = "Not a valid number of hours";
    }
    return errors;
  };

  useEffect(() => {
    const fetchUserById = async (id) => {
      try {
        const res = await getUserById(id);
        setUser(res.data);
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

  const handleDelete = async () => {
    if (confirm(`Delete user ${id}?`)) {
      try {
        const res = await deleteUser(id);
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

  if (loading) return <p>Loading...</p>;
  return (
    <div className="container">
      <h2>User ID: {id} </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Role:</label>
          <select id="userRole" className="form-control">
            <option value={"student"}>Student</option>
            <option value={"faculty"}>Faculty</option>
            <option value={"admin"}>Admin</option>
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
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
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

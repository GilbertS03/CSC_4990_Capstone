import { getAllUsers } from "../../services/api/admin";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        // setFilteredDevices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center">All Users</h1>
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Weekly Hours Remaining</th>
              <th>Role</th>
              <th>Edit User</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(users).length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No Users Found.
                </td>
              </tr>
            ) : (
              Object.keys(users).map((key) => (
                <tr key={key}>
                  <td>{users[key].firstName}</td>
                  <td>{users[key].lastName}</td>
                  <td>{users[key].email}</td>
                  <td>{users[key].weeklyHoursRemaining}</td>
                  <td>{users[key].role}</td>
                  <td>
                    <NavLink
                      to={`/admin/users/${key}`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit User: {key}
                    </NavLink>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;

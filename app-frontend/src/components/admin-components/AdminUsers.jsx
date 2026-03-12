import { getAllUsers } from "../../services/api/admin";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

function AdminUsers() {
  const [users, setUsers] = useState({});
  const [filteredUsers, setFilteredUsers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setFilteredUsers(data);
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
    <div className="container-fluid d-flex flex-column justify-content-center">
      <h1 className="text-center">All Users</h1>
      <SearchBar
        data={users}
        setFilteredData={setFilteredUsers}
        fields={[
          { label: "First Name", key: "firstName", type: "text" },
          { label: "Last Name", key: "lastName", type: "text" },
          { label: "Email", key: "email", type: "text" },
          {
            label: "Role",
            key: "role",
            type: "select",
            options: ["ADMIN", "USER"],
          },
        ]}
      />
      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover align-middle">
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
            {Object.keys(filteredUsers).length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No Users Found.
                </td>
              </tr>
            ) : (
              Object.keys(filteredUsers).map((key) => (
                <tr key={key}>
                  <td>{filteredUsers[key].firstName}</td>
                  <td>{filteredUsers[key].lastName}</td>
                  <td>{filteredUsers[key].email}</td>
                  <td>{filteredUsers[key].weeklyHoursRemaining}</td>
                  <td>{filteredUsers[key].role}</td>
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

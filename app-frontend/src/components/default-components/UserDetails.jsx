import { useEffect, useState } from "react";
import { getReservationStatuses, getCurrentUser } from "../../services/api/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../theme.css";
import "./UserDetails.css";

function getInitials(firstName, lastName) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

function UserDetails() {
  const [currentUser, setCurrentUser] = useState({});
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!isAuthenticated) return;
    logout();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getCurrentUser();
        const user = userData.data;
        setCurrentUser(user);

        const resData = await getReservationStatuses("Completed", user.userId);
        setReservations(resData.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="ud-status">Loading...</div>;
  if (error) return <div className="ud-status ud-error">Error loading page.</div>;

  const reservationList = Object.values(reservations);

  return (
    <div className="ud-container">
      {/* Stats row */}
      <div className="ud-stats">
        <div className="stat-card">
          <div className="stat-num">{reservationList.length}</div>
          <div className="stat-label">Completed sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{currentUser.weeklyHoursRemaining ?? "—"}</div>
          <div className="stat-label">Weekly hours left</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{currentUser.role ?? "—"}</div>
          <div className="stat-label">Account role</div>
        </div>
      </div>

      <div className="ud-grid">
        {/* Profile card */}
        <div className="card-dark ud-profile-card">
          <div className="card-header-dark ud-profile-header">
            <div className="ud-avatar">
              {getInitials(currentUser.firstName, currentUser.lastName)}
            </div>
            <div>
              <div className="ud-name">
                {currentUser.firstName} {currentUser.lastName}
              </div>
              <div className="ud-role-tag">{currentUser.role} · active</div>
            </div>
          </div>
          <div className="ud-fields">
            <div className="ud-field-row">
              <span className="ud-field-label">Email</span>
              <span className="ud-field-value ud-mono">{currentUser.email}</span>
            </div>
            <div className="ud-field-row">
              <span className="ud-field-label">Role</span>
              <span className="ud-field-value">{currentUser.role}</span>
            </div>
            <div className="ud-field-row">
              <span className="ud-field-label">Hours remaining</span>
              <span className="ud-hours-badge">{currentUser.weeklyHoursRemaining}h</span>
            </div>
          </div>
        </div>

        {/* Reservations table */}
        <div className="card-dark ud-res-card">
          <div className="ud-res-header">
            <span className="ud-res-title">Completed reservations</span>
            <span className="badge-accent">{reservationList.length} total</span>
          </div>
          {reservationList.length === 0 ? (
            <div className="ud-empty">No completed reservations yet.</div>
          ) : (
            <table className="table-dark-custom">
              <thead>
                <tr>
                  <th>Reservation ID</th>
                  <th>Device</th>
                  <th>Completed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reservationList.map((res) => (
                  <tr key={res.reservationId}>
                    <td>#{res.reservationId}</td>
                    <td>{res.deviceId}</td>
                    <td>{res.endTime}</td>
                    <td>
                      <span className="badge-success">{res.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="ud-actions">
        <button className="btn btn-primary" onClick={() => navigate("/buildings")}>
          Reserve a computer
        </button>
        <button className="btn btn-ghost" onClick={() => navigate("/")}>
          Back to home
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default UserDetails;

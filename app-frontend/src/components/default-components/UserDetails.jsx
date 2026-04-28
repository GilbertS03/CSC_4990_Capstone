import { useEffect, useState } from "react";
import {
  getCurrentUser,
  dropReservation,
  getReservationsById,
} from "../../services/api/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../theme.css";
import "./UserDetails.css";

function getInitials(firstName, lastName) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

const TERMINAL_STATUSES = ["Completed", "Dropped", "Cancelled"]; // adjust to match your API's exact strings

function formatDateTime(raw) {
  if (!raw) return "—";
  return new Date(raw).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
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

  const handleDrop = async (reservationId) => {
    if (!confirm(`Drop reservation #${reservationId}?`)) return;
    try {
      await dropReservation(reservationId);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to drop reservation. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const userData = await getCurrentUser();
      const user = userData.data;
      setCurrentUser(user);

      const resData = await getReservationsById(user.userId); // fetch all, no status filter
      setReservations(Object.values(resData.data));
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="ud-status">Loading...</div>;
  if (error)
    return <div className="ud-status ud-error">Error loading page.</div>;

  return (
    <div className="ud-container">
      {/* Stats row */}
      <div className="ud-stats">
        <div className="stat-card">
          <div className="stat-num">{reservations.length}</div>
          <div className="stat-label">Total reservations</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">
            {currentUser.weeklyHoursRemaining ?? "—"}
          </div>
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
              <span className="ud-field-value ud-mono">
                {currentUser.email}
              </span>
            </div>
            <div className="ud-field-row">
              <span className="ud-field-label">Role</span>
              <span className="ud-field-value">{currentUser.role}</span>
            </div>
            <div className="ud-field-row">
              <span className="ud-field-label">Hours remaining</span>
              <span className="ud-hours-badge">
                {currentUser.weeklyHoursRemaining}h
              </span>
            </div>
          </div>
        </div>

        {/* Reservations table */}
        <div className="card-dark ud-res-card">
          <div className="ud-res-header">
            <span className="ud-res-title">All reservations</span>
            <span className="badge-accent">{reservations.length} total</span>
          </div>
          {reservations.length === 0 ? (
            <div className="ud-empty">No reservations yet.</div>
          ) : (
            <table className="table-dark-custom">
              <thead>
                <tr>
                  <th>Reservation ID</th>
                  <th>Device</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => {
                  const isTerminal = TERMINAL_STATUSES.includes(res.status);
                  return (
                    <tr key={res.reservationId}>
                      <td>#{res.reservationId}</td>
                      <td>{res.deviceId}</td>
                      <td>{formatDateTime(res.startTime)}</td>
                      <td>{formatDateTime(res.endTime)}</td>
                      <td>
                        <span
                          className={
                            isTerminal ? "badge-neutral" : "badge-success"
                          }
                        >
                          {res.status}
                        </span>
                      </td>
                      <td>
                        {!isTerminal && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDrop(res.reservationId)}
                          >
                            Drop
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="ud-actions">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/buildings")}
        >
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

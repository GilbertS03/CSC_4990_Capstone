import { useEffect, useState } from "react";
import {
  getAllReservations,
  deleteReservation,
  dropReservation,
} from "../../services/api/admin";
import { NavLink } from "react-router-dom";
function Reservations() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reservations, setReservations] = useState([]);

  const fetchAllReservations = async () => {
    try {
      const res = await getAllReservations();
      setReservations(res.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const handleDeleteReservation = async (id) => {
    if (confirm(`Delete Reservation ${id}?`)) {
      try {
        setLoading(true);
        const res = await deleteReservation(id);
        setReservations(reservations.filter((res) => res.reservationId !== id));
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  };

  const handleDropReservation = async (id) => {
    if (confirm(`Drop Reservation ${id}?`)) {
      try {
        setLoading(true);
        const res = await dropReservation(id, "Admin Dropped reservation");
        fetchAllReservations();
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred, try again please</p>;
  return (
    <div className="container">
      <p>
        <NavLink to="/admin" end>
          &larr; Go back!
        </NavLink>
      </p>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Reservation ID</th>
            <th>Status</th>
            <th>User ID</th>
            <th>Drop Reservation</th>
            <th>Delete Reservation</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(reservations).map((key) => (
            <tr key={key}>
              <td>{reservations[key].deviceId}</td>
              <td>{reservations[key].startTime}</td>
              <td>{reservations[key].endTime}</td>
              <td>{reservations[key].reservationId}</td>
              <td>{reservations[key].status}</td>
              <td>{reservations[key].userId}</td>
              <td className="text-center">
                {reservations[key].status === "Pending" ? (
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleDropReservation(reservations[key].reservationId)
                    }
                  >
                    Drop Reservation: {reservations[key].reservationId}
                  </button>
                ) : (
                  <p>Cannot Drop</p>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDeleteReservation(reservations[key].reservationId)
                  }
                >
                  Delete Reservation: {reservations[key].reservationId}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservations;

import { useEffect, useState } from "react";
import { getAllReservations } from "../../services/api/admin";
import { NavLink } from "react-router-dom";
function Reservations() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
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
    fetchAllReservations();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred, try again please</p>;
  return (
    <div className="container">
      <p>
        <NavLink to="/admin" end>
          &larr; Go back
        </NavLink>
      </p>
      <table>
        <thead>
          <tr>
            <td>Data</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Reservations;

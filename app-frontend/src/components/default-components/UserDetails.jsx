import { useEffect, useState } from "react";
import { getReservationStatuses, getCurrentUser } from "../../services/api/user";
import { NavLink, useFetcher, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UserDetails() {
    const [currentUser, setCurrentUser] = useState({});
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { isAuthenticated, logout, user } = useAuth();
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
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading page.</p>;

    return (
        <>
            <div className="container">
                <div className="card bg-dark text-light m-3">
                    <div className="card-header">User Profile</div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Name: {currentUser.firstName} {currentUser.lastName}</li>
                        <li className="list-group-item">Email: {currentUser.email}</li>
                        <li className="list-group-item">Role: {currentUser.role}</li>
                        <li className="list-group-item">Remaining Weekly Hours: {currentUser.weeklyHoursRemaining}</li>
                    </ul>
                </div>

                <p>
                    <button className="btn btn-dark ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#reservationList" aria-expanded="false" aria-controls="reservationList">
                        Show Reservations
                    </button>
                </p>
                <div>
                    <div className="collapse collapse-vertical ms-3 mb-1" id="reservationList">
                        <div className="card card-body bg-dark">
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th>Reservation ID</th>
                                        <th>Status</th>
                                        <th>Device ID</th>
                                        <th>Scheduled Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(reservations).map((key) => (
                                        <tr key={key}>
                                            <td>{reservations[key].reservationId}</td>
                                            <td>{reservations[key].status}</td>
                                            <td>{reservations[key].deviceId}</td>
                                            <td>{reservations[key].endTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="ms-3 mt-1 btn btn-dark">
                    <NavLink className="nav-link" onClick={handleLogout}>
                        Logout
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default UserDetails;
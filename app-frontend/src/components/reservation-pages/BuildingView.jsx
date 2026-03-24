import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function BuildingView() {
    const [roomsData, setRoomsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { buildingId } = useParams();

    useEffect(() => {
        const fetchRoomsData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/rooms/${buildingId}`);
                setRoomsData(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomsData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="container">
                {roomsData.map(r => (
                    <div className="col-sm-6 mb-3 mb-sm-0 p-2" key={r.roomId} >
                        <div className="card text-bg-dark">
                            <div className="card-body">
                                <h5 className="card-title">{r.roomName}</h5>
                                <p className="card-text">Remaining Available Devices: </p>
                                <button className="btn btn-secondary"> <Link className="no-underline-link text-light" to={`/reserve/`}>View Devices</Link></button>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="btn btn-dark ms-2 mt-2">
                    <Link className="no-underline-link text-light" to={`/reserve/`}>Return to List</Link>
                </button>
            </div>
        </>
    )
}
export default BuildingView;
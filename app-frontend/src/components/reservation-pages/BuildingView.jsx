import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BuildingView() {
    const [roomsData, setRoomsData] = useState([]);
    const [availableDeviceCounts, setAvailableDeviceCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { buildingId } = useParams();

    useEffect(() => {
        const fetchRoomsData = async () => {
            let rooms = [];
            try {
                const res = await axios.get(`http://127.0.0.1:8000/rooms/${buildingId}`);
                rooms = res.data;
                setRoomsData(rooms);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
            const counts = {};
            for (const room of rooms) {
                try {
                    const countRes = await axios.get(`http://127.0.0.1:8000/rooms/${room.roomId}/available-device-count`);
                    counts[room.roomId] = countRes.data;
                    console.log(room);
                } catch {
                    counts[room.roomId] = 0;
                }
            }
            setAvailableDeviceCounts(counts);
        };

        fetchRoomsData();

    }, [buildingId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!roomsData || roomsData.length === 0) {
        return (
            <>
                <div className="container">
                    <h1>No rooms to show!</h1>
                    <button className="btn btn-dark ms-2 mt-2">
                        <Link className="no-underline-link text-light" to={`/reserve/`}>Return to List</Link>
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container">
                {roomsData.map(r => (
                    <div className="col-sm-6 mb-3 mb-sm-0 p-2" key={r.roomId} >
                        <div className="card text-bg-dark">
                            <div className="card-body">
                                <h5 className="card-title">{r.roomName}</h5>
                                <p className="card-text">Remaining Available Devices: {availableDeviceCounts[r.roomId] ?? "..."}</p>
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

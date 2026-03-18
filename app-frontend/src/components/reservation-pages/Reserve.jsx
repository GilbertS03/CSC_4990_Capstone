import { useState, useEffect } from "react";
import axios from "axios";

const API_HOST_URL = import.meta.env.VITE_API_URL;

function Reserve() {
    const [buildingData, setBuildingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBuildingData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/buildings/`);
                setBuildingData(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBuildingData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div>
                <div className="btn-group">
                    <button type="button" className="btn btn-secondary">Buildings</button>
                    <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        {buildingData.map(b => (
                            <li key={b.buildingId}><a className="dropdown-item" href="#">{b.buildingName}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Reserve;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
            <div className="container d-flex align-items-center">
                <div className="row">
                    <div className="btn-group col-4" id="bListDropdown">
                        <button type="button" className="btn btn-info">Buildings</button>
                        <button type="button" className="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            {buildingData.map(b => (
                                <li key={b.buildingId}>
                                    <Link className="dropdown-item" to={`/reserve/${b.buildingId}`}>
                                        {b.buildingName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Reserve;
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
                    {buildingData.map(b => (
                        <div className="col-sm-6 mb-3 mb-sm-0 p-2" key={b.buildingId} >
                            <div className="card text-bg-dark">
                                <div className="card-body">
                                    <h5 className="card-title">{b.buildingName}</h5>
                                    <p className="card-text">Remaining Available Devices: X</p>
                                    <button className="btn btn-secondary">
                                        <Link className="no-underline-link text-light" to={`/reserve/${b.buildingId}`}>Reserve</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Reserve;
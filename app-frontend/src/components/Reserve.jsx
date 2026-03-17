import { useState, useEffect } from "react";

const API_HOST_URL = import.meta.env.VITE_API_URL;

function Reserve() {
    const [buildingData, setBuildingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBuildingData = async () => {
            try {
                const res = await fetch(API_HOST_URL + "/buildings");
                if (!res.ok) throw new Error("Failed to fetch building data");
                const json = await res.json();
                setBuildingData(json);
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
            <div className="btn-group">
                <button type="button" className="btn btn-secondary">Buildings</button>
                <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">B1</a></li>
                    <li><a className="dropdown-item" href="#">B2</a></li>
                    <li><a className="dropdown-item" href="#">B2</a></li>
                </ul>
            </div>

            <div>

            </div>
        </>
    )
}
export default Reserve;
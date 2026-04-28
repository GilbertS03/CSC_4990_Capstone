import { useEffect, useState } from "react";
import { useLocation, NavLink, useParams, useNavigate } from "react-router-dom";
import {
  createReservation,
  getAllBuildingHours,
} from "../../services/api/user";
import ReserveForm from "./ReserveForm";

function ViewCell() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [device, setDevice] = useState(
    location.state?.device || { deviceStatus: "unavailable" },
  );
  const [building, setBuilding] = useState(null);
  const { bid, rid, row, col } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getAllBuildingHours();
        const buildings = res.data;

        const buildingObj = buildings.find(
          (b) => String(b.buildingId) === String(bid),
        );

        if (!buildingObj) throw new Error("Building not found");

        setBuilding({
          ...buildingObj,
        });
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bid]);

  const onReserve = async ({ deviceId, startTime, endTime }) => {
    try {
      await createReservation({ deviceId, startTime, endTime });
      alert("Reservation Confirmed");
      navigate(-1);
    } catch (err) {
      if (err.response?.status === 409) {
        alert(err.response.data.detail);
      } else {
        alert("Reservation failed. Please try again.");
      }
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred, try again.</p>;
  return (
    <div className="container">
      <p>
        <NavLink to={`/buildings/${bid}/${rid}`}> &larr; Back </NavLink>
      </p>
      {/* Do a component that will pull up a form for reserving. If nothing, show that there's nothing here, else, show the form. */}
      {/* Show the building times and do validation */}
      {device.deviceStatus !== "unavailable" ? (
        <ReserveForm
          device={device}
          row={row}
          col={col}
          building={building}
          onReserve={onReserve}
          onCancel={onCancel}
        />
      ) : (
        <p>No Device exist here</p>
      )}
    </div>
  );
}

export default ViewCell;

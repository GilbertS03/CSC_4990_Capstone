import { useEffect, useState } from "react";
import { useLocation, NavLink, useParams, useNavigate } from "react-router-dom";
import { getAllBuildingHours, getAllBuildings } from "../../services/api/user";
import ReserveForm from "./ReserveForm";

function ViewCell() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [device, setDevice] = useState(location.state?.device || null);
  const [building, setBuilding] = useState(null);
  const { bid, rid, row, col } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Get buildings (to map ID → name)
        const buildingsRes = await getAllBuildings();
        const buildings = buildingsRes.data;

        const buildingObj = buildings.find(
          (b) => String(b.buildingId) === String(bid),
        );

        if (!buildingObj) throw new Error("Building not found");

        // 2. Get hours (uses name)
        const hoursRes = await getAllBuildingHours();
        const hours = hoursRes.data;

        const buildingHours = hours.find(
          (h) => h.buildingName === buildingObj.buildingName,
        );

        if (!buildingHours) throw new Error("Hours not found");

        setBuilding({
          ...buildingObj,
          ...buildingHours,
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

  const onReserve = (selectedTime) => {
    const [openH, openM] = building.openTime.split(":");
    const [closeH, closeM] = building.closeTime.split(":");

    const now = new Date(selectedTime);

    const open = new Date();
    open.setHours(openH, openM, 0);

    const close = new Date();
    close.setHours(closeH, closeM, 0);

    if (now < open || now > close) {
      alert("Outside building hours");
      return;
    }

    console.log("Valid reservation");
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

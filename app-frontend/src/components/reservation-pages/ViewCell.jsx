import { useEffect, useState } from "react";
import { useLocation, NavLink, useParams, useNavigate } from "react-router-dom";
import ReserveForm from "./ReserveForm";

function ViewCell() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [device, setDevice] = useState(location.state?.device || null);
  const { bid, rid, row, col } = useParams();

  const onReserve = () => {
    console.log("Hello World!");
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

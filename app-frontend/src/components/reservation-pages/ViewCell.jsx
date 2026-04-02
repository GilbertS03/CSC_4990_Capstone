import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ViewCell() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [device, setDevice] = useState(location.state?.device || null);

  console.log("device: ", device);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred, try again.</p>;
  return <></>;
}

export default ViewCell;

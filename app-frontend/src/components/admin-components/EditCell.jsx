import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditCellForm from "./EditCellForm";

function EditCell() {
  const { rid, row, col } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [device, setDevice] = useState(location.state?.device || null);
  const [loading, setLoading] = useState(!location.state?.device);

  const onCancel = () => {
    navigate(-1);
  };

  //todo find out what to do here
  const onSave = () => {
    console.log("Saved!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <EditCellForm
      device={device}
      row={Number(row)}
      col={Number(col)}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
}
export default EditCell;

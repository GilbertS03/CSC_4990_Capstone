import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditCellForm from "./EditCellForm";

function EditCell() {
  const { rid, row, col } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [device, setDevice] = useState(location.state?.device || null);

  useEffect(() => {
    console.log(device);
  }, []);

  const onCancel = () => {
    navigate(-1);
  };
  const onSave = () => {
    navigate(-1);
  };

  return (
    <EditCellForm
      device={device}
      row={Number(row)}
      col={Number(col)}
      onCancel={onCancel}
      roomId={rid}
    />
  );
}
export default EditCell;

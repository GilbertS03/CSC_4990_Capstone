import { useParams, useNavigate } from "react-router-dom";
import { getRoomLayoutById } from "../../services/api/admin";
import { useEffect, useState } from "react";
import DynamicGrid from "./DynamicGrid";
import BuildingHoursForm from "./BuildingHoursForm";
import RoomDimensionsForm from "./RoomDimensionsForm";
import "../../App.css";

function RoomEditing() {
  const { id, rid } = useParams();
  const [roomWidth, setRoomWidth] = useState(0);
  const [roomHeight, setRoomHeight] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomLayoutById = async () => {
      try {
        const res = await getRoomLayoutById(rid);
        const data = res.data;
        setRoomHeight(data.layoutHeight);
        setRoomWidth(data.layoutWidth);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomLayoutById();
  }, [rid]);

  const handleCellClick = (device, row, col) => {
    navigate(`/admin/buildings/${id}/${rid}/${row}/${col}`, {
      state: { device },
    });
  };

  const handleDimensionsUpdate = (newWidth, newHeight) => {
    setRoomWidth(newWidth);
    setRoomHeight(newHeight);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Data</p>;

  return (
    <div className="container">
      <BuildingHoursForm buildingId={id} />
      <DynamicGrid
        height={roomHeight}
        width={roomWidth}
        rid={rid}
        buildingId={id}
        onCellClick={handleCellClick}
      />
      <div className="legend">
        <RoomDimensionsForm
          roomId={rid}
          currentWidth={roomWidth}
          currentHeight={roomHeight}
          onSuccess={handleDimensionsUpdate}
        />
      </div>
    </div>
  );
}

export default RoomEditing;

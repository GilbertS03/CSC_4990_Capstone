import { useParams, useNavigate } from "react-router-dom";
import { getRoomLayoutById } from "../../services/api/admin";
import { useEffect, useState } from "react";
import DynamicGrid from "./DynamicGrid";
import "../../App.css";

function RoomEditing() {
  const { id, rid } = useParams();
  const [roomWidth, setRoomWidth] = useState(0);
  const [roomHeight, setRoomHeight] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRoomLayoutById = async (id) => {
      try {
        const res = await getRoomLayoutById(id);
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
    fetchRoomLayoutById(rid);
  }, []);

  const handleCellClick = (device, row, col) => {
    navigate(`/admin/buildings/${id}/${rid}/${row}/${col}`, {
      state: { device },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Data</p>;
  return (
    <div className="container">
      <DynamicGrid
        height={roomHeight}
        width={roomWidth}
        rid={rid}
        onCellClick={handleCellClick}
      />
      <div className="legend">
        green = available, black = not available (any reason besides reserved),
        red = reserved
        {/* Todo add a way to change the dimensions of the room by allowing them to access a form that will ask and validate the number */}
        <div className="edit-form">Change dimensions of room?</div>
      </div>
    </div>
  );
}

export default RoomEditing;

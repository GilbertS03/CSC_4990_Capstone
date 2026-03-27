import { useParams } from "react-router-dom";
import { getRoomLayoutById } from "../../services/api/admin";
import { useEffect, useState } from "react";
import DynamicGrid from "./DynamicGrid";
import "../../App.css";

function RoomEditing() {
  const { rid } = useParams();
  const [roomWidth, setRoomWidth] = useState(0);
  const [roomHeight, setRoomHeight] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Data</p>;
  return (
    <div className="container">
      <DynamicGrid height={roomHeight} width={roomWidth} />
    </div>
  );
}

export default RoomEditing;

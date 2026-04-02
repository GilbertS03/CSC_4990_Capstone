import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoomLayoutById } from "../../services/api/user";
import DynamicGrid from "../admin-components/DynamicGrid";
function SpecificRoom() {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { bid, rid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRoomData = async (id) => {
      try {
        const res = await getRoomLayoutById(id);
        setRoomData(res.data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData(rid);
  }, []);

  const handleCellClick = (device, row, col) => {
    navigate(`/buildings/${bid}/${rid}/${row}/${col}`, {
      state: { device },
    });

    console.log(device, row, col);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred, try again please</p>;
  return (
    <div className="container">
      <NavLink to={`/buildings/${bid}`} end>
        &larr; Back
      </NavLink>
      <DynamicGrid
        height={roomData.layoutHeight}
        width={roomData.layoutWidth}
        rid={rid}
        onCellClick={handleCellClick}
      />
    </div>
  );
}
export default SpecificRoom;

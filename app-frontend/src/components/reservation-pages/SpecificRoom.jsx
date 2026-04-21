import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getRoomLayoutById,
  getAllBuildingHours,
} from "../../services/api/user";
import DynamicGrid from "../admin-components/DynamicGrid";
function SpecificRoom() {
  const [roomData, setRoomData] = useState(null);
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { bid, rid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildingsData = async (id) => {
      try {
        const res1 = await getRoomLayoutById(id);
        setRoomData(res1.data);
        const res2 = await getAllBuildingHours();
        const buildings = res2.data;
        const foundBuilding = buildings.find(
          (b) => Number(b.buildingId) === Number(bid),
        );
        setBuilding(foundBuilding);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBuildingsData(rid);
  }, [bid, rid]);

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
        building={building}
        onCellClick={handleCellClick}
      />
    </div>
  );
}
export default SpecificRoom;

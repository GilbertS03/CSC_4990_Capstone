import { useState, useCallback } from 'react';
import { getRoomsByBuildingId } from '../../../services/api/admin';

export function useRooms() {
  const [roomsByBuilding, setRoomsByBuilding] = useState({});
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [roomError, setRoomError] = useState(null);

  const loadRooms = useCallback(async (buildingId) => {
    if (roomsByBuilding[buildingId]) return;
    setLoadingRooms(true);
    setRoomError(null);
    try {
      const res = await getRoomsByBuildingId(buildingId);
      const rooms = res.data;
      setRoomsByBuilding((prev) => ({ ...prev, [buildingId]: rooms || [] }));
    } catch (e) {
      setRoomError(e?.message || 'Failed to load rooms');
    } finally {
      setLoadingRooms(false);
    }
  }, [roomsByBuilding]);

  return { roomsByBuilding, loadingRooms, roomError, loadRooms };
}

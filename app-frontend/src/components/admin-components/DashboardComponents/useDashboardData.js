import { useState, useEffect, useCallback } from 'react';
import {
  getAllBuildings,
  getAllDevices,
  getAllReservations,
} from '../../../services/api/admin';

export function useDashboardData() {
  const [buildings, setBuildings] = useState([]);
  const [devices, setDevices] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, d, r] = await Promise.all([
        getAllBuildings(),
        getAllDevices(),
        getAllReservations(),
      ]);
      setBuildings(b.data || []);
      setDevices(d.data || []);
      setReservations(r.data || []);
    } catch (e) {
      setError(e?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { buildings, devices, reservations, loading, error, refresh: load };
}

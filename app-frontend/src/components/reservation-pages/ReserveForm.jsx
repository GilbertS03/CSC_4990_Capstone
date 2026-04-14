import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DeviceInfo from "./ReserveFormComponents/DeviceInfo";
import Calendar from "./ReserveFormComponents/Calendar";
import Time from "./ReserveFormComponents/Time";
import { getCurrentUser } from "../../services/api/user";

function ReserveForm({ device, row, col, building, onReserve, onCancel }) {
  const [formData, setFormData] = useState({
    email: "",
    duration: "1",
    startTime: "",
    reservationDate: "",
  });
  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const email = user?.email ?? "";
    setFormData((prev) => ({
      ...prev,
      email,
    }));
  }, [user]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();
        setCurrentUser(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  if (!device) {
    return (
      <div className="container py-2 text-center">
        <div className="alert alert-dark">
          No device available at this location.
        </div>
        <button className="btn btn-secondary mt-3" onClick={onCancel}>
          Go Back
        </button>
      </div>
    );
  }

  const isUnavailable = device.deviceStatus === "unavailable";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!building) return alert("Building data not loaded.");
    if (!formData.startTime) return alert("Please select a start time.");
    if (!formData.reservationDate) return alert("Please select a date.");

    const buildDateTime = (dateStr, timeStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      const [h, m] = timeStr.split(":").map(Number);
      const d = new Date(dateStr);
      return new Date(year, month - 1, day, h, m, 0, 0);
    };

    const start = buildDateTime(formData.reservationDate, formData.startTime);
    const durationMs = parseFloat(formData.duration) * 60 * 60 * 1000;
    const durationHours = parseFloat(formData.duration);
    const end = new Date(start.getTime() + durationMs);

    const today = new Date();
    const open = buildDateTime(formData.reservationDate, building.openTime);
    const close = buildDateTime(formData.reservationDate, building.closeTime);

    if (start < open || end > close) {
      alert(
        `Outside building hours (${building.openTime} - ${building.closeTime})`,
      );
      return;
    }
    if (currentUser.weeklyHoursRemaining < durationHours) {
      alert(
        `Not enough remaining hours: ${currentUser.weeklyHoursRemaining} hours`,
      );
      return;
    }
    if (start < today) {
      alert("Cannot reserve a time in the past.");
      return;
    }
    const payload = {
      deviceId: Number(device.deviceId),
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    };
    setLoading(true);
    try {
      await onReserve(payload);
    } catch (err) {
      console.error("Reservation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading data, try again...</p>;
  return (
    <div className="container py-2">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                Reserve Device ({row}, {col})
              </h5>
            </div>

            <div className="card-body">
              <DeviceInfo device={device} />
              {/* Building Hours Display */}

              {building && (
                <div className="alert alert-info">
                  Hours: {building.openTime} - {building.closeTime}
                </div>
              )}

              {isUnavailable ? (
                <div className="text-center">
                  <p className="text-muted">
                    This device cannot be reserved right now.
                  </p>
                  <button className="btn btn-secondary mt-2" onClick={onCancel}>
                    Go Back
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <Calendar handleChange={handleChange} formData={formData} />

                  <Time
                    handleChange={handleChange}
                    formData={formData}
                    building={building}
                  />

                  {/* Buttons */}
                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={loading}
                    >
                      {loading ? "Reserving..." : "Confirm Reservation"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReserveForm;

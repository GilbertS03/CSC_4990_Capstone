import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

function ReserveForm({ device, row, col, building, onReserve, onCancel }) {
  const [formData, setFormData] = useState({
    email: "",
    duration: "1",
    startTime: "",
    reservationDate: "",
  });

  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const email = user?.email ?? "";
    setFormData((prev) => ({
      ...prev,
      email,
    }));
  }, [user]);

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

  const isUnavailable =
    device.deviceStatus === "reserved" || device.deviceStatus === "unavailable";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //helper: convert "HH:mm:ss" → Date today
  const buildTime = (timeStr) => {
    const [h, m] = timeStr.split(":");
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!building) {
      alert("Building data not loaded.");
      return;
    }

    if (!formData.startTime) {
      alert("Please select a start time.");
      return;
    }

    const open = buildTime(building.openTime);
    const close = buildTime(building.closeTime);

    const start = buildTime(formData.startTime);

    // duration is in hours → convert to ms
    const durationMs = parseFloat(formData.duration) * 60 * 60 * 1000;
    const end = new Date(start.getTime() + durationMs);

    // VALIDATION
    if (start < open || end > close) {
      alert(
        `Reservation must be within building hours (${building.openTime} - ${building.closeTime})`,
      );
      return;
    }

    setLoading(true);

    try {
      await onReserve({
        deviceId: device.deviceId,
        row,
        col,
        ...formData,
      });
    } catch (err) {
      console.error("Reservation failed:", err);
    } finally {
      setLoading(false);
    }
  };

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
              {/* Device Info */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Device</label>
                <input
                  type="text"
                  className="form-control"
                  value={`${device.deviceType} #${device.deviceId}`}
                  disabled
                />
              </div>

              {/* Status */}
              <div
                className={`alert ${
                  device.deviceStatus === "available"
                    ? "alert-success"
                    : device.deviceStatus === "reserved"
                      ? "alert-danger"
                      : "alert-dark"
                }`}
              >
                Status: {device.deviceStatus}
              </div>

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
                  {/* Reservation Date */}
                  <div className="mb-3">
                    <label className="form-label">Reservation Date</label>
                    <input
                      type="date"
                      name="reservationDate"
                      value={formData.reservationDate}
                      onChange={handleChange}
                      className="form-control"
                      required
                      min={new Date().toISOString().split("T")[0]} // today
                      max={
                        new Date(new Date().setMonth(new Date().getMonth() + 1))
                          .toISOString()
                          .split("T")[0]
                      } // 1 month from now
                    />
                  </div>
                  {/* Start Time */}
                  <div className="mb-3">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="form-control"
                      min={building?.openTime}
                      max={building?.closeTime}
                      required
                    />
                  </div>

                  {/* Duration */}
                  <div className="mb-3">
                    <label className="form-label">Reservation Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="0.5">30 Minutes</option>
                      <option value="1">1 Hour</option>
                      <option value="1.5">1:30 Hours</option>
                      <option value="2">2 Hours</option>
                    </select>
                  </div>

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

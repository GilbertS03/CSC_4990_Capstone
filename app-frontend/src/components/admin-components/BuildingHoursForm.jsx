import { useState } from "react";
import { editBuildingHoursById } from "../../services/api/admin";
import Time from "./Time";

function BuildingHoursForm({ buildingId }) {
  const [formData, setFormData] = useState({ startTime: "", duration: "0.5" });
  const [closeTime, setCloseTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.startTime || !closeTime) {
      setError("Both open and close times are required.");
      return;
    }
    if (formData.startTime >= closeTime) {
      setError("Open time must be before close time.");
      return;
    }

    setSubmitting(true);
    try {
      const openISO = `${formData.startTime}:00.000Z`;
      const closeISO = `${closeTime}:00.000Z`;
      await editBuildingHoursById(buildingId, {
        openTime: openISO,
        closeTime: closeISO,
      });
      setSuccess("Building hours updated successfully.");
    } catch (err) {
      setError("Failed to update building hours. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="edit-form">
      <h3>Edit Building Hours</h3>
      <form onSubmit={handleSubmit}>
        <Time formData={formData} handleChange={handleChange} />
        <div className="mb-3">
          <label className="form-label">Close Time</label>
          <input
            type="time"
            name="closeTime"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            className="form-control"
            required
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : "Save Hours"}
        </button>
      </form>
    </div>
  );
}

export default BuildingHoursForm;

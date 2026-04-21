import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBuilding } from "../../services/api/admin";

const DEFAULT = {
  buildingId: "",
  buildingName: "",
  openTime: "08:00",
  closeTime: "22:00",
};

function CreateBuilding() {
  const [form, setForm] = useState(DEFAULT);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = (f = form) => {
    const errs = {};
    if (!f.buildingName.trim())
      errs.buildingName = "Building name is required.";
    if (f.openTime && f.closeTime && f.openTime >= f.closeTime)
      errs.time = "Close time must be after open time.";
    return errs;
  };

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    // clear relevant error on change
    setErrors(validate(updated));
  };

  const toTimeString = (val) => (val ? `${val}:00.000Z` : null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const body = {
      buildingId: parseInt(form.buildingId) || 0,
      buildingName: form.buildingName.trim(),
      openTime: toTimeString(form.openTime),
      closeTime: toTimeString(form.closeTime),
    };

    try {
      setSubmitting(true);
      await createBuilding(body);
      navigate("/admin/buildings");
    } catch (err) {
      console.error(err);
      setErrors({ api: "Failed to create building. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 480, paddingTop: "2rem" }}>
      <h4 className="mb-4">Add building</h4>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Building ID</label>
          <input
            type="number"
            name="buildingId"
            className="form-control"
            value={form.buildingId}
            onChange={handleChange}
            min={0}
            placeholder="e.g. 42"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Building name</label>
          <input
            type="text"
            name="buildingName"
            className={`form-control ${errors.buildingName ? "is-invalid" : ""}`}
            value={form.buildingName}
            onChange={handleChange}
            placeholder="e.g. Engineering Hall"
          />
          {errors.buildingName && (
            <div className="invalid-feedback">{errors.buildingName}</div>
          )}
        </div>

        <div className="row g-3 mb-1">
          <div className="col">
            <label className="form-label">Open time</label>
            <input
              type="time"
              name="openTime"
              className={`form-control ${errors.time ? "is-invalid" : ""}`}
              value={form.openTime}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Close time</label>
            <input
              type="time"
              name="closeTime"
              className={`form-control ${errors.time ? "is-invalid" : ""}`}
              value={form.closeTime}
              onChange={handleChange}
            />
          </div>
        </div>
        {errors.time && (
          <div className="text-danger small mb-3">{errors.time}</div>
        )}

        {errors.api && (
          <div className="alert alert-danger py-2 small">{errors.api}</div>
        )}

        <div className="d-flex gap-2 justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/admin/buildings")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Saving…" : "Add building"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBuilding;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRoom } from "../../services/api/admin";

const DEFAULT = { roomName: "", layoutWidth: "", layoutHeight: "" };

function CreateRoom() {
  const { id } = useParams();
  const [form, setForm] = useState(DEFAULT);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = (f = form) => {
    const errs = {};
    if (!f.roomName.trim()) errs.roomName = "Room name is required.";
    if (!f.layoutWidth || parseInt(f.layoutWidth) < 1)
      errs.layoutWidth = "Must be at least 1.";
    if (!f.layoutHeight || parseInt(f.layoutHeight) < 1)
      errs.layoutHeight = "Must be at least 1.";
    return errs;
  };

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    setErrors(validate(updated));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const body = {
      roomName: form.roomName.trim(),
      buildingId: parseInt(id),
      layoutWidth: parseInt(form.layoutWidth),
      layoutHeight: parseInt(form.layoutHeight),
    };

    try {
      setSubmitting(true);
      await createRoom(body);
      navigate(`/admin/buildings/${id}`);
    } catch (err) {
      console.error(err);
      setErrors({ api: "Failed to create room. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 480, paddingTop: "2rem" }}>
      <h4 className="mb-1">Add room</h4>
      <p className="text-secondary small mb-4">Building ID: {id}</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Room name</label>
          <input
            type="text"
            name="roomName"
            className={`form-control ${errors.roomName ? "is-invalid" : ""}`}
            value={form.roomName}
            onChange={handleChange}
            placeholder="e.g. Lab 101"
          />
          {errors.roomName && (
            <div className="invalid-feedback">{errors.roomName}</div>
          )}
        </div>

        <div className="row g-3 mb-3">
          <div className="col">
            <label className="form-label">Layout width</label>
            <input
              type="number"
              name="layoutWidth"
              className={`form-control ${errors.layoutWidth ? "is-invalid" : ""}`}
              value={form.layoutWidth}
              onChange={handleChange}
              min={1}
              placeholder="columns"
            />
            {errors.layoutWidth && (
              <div className="invalid-feedback">{errors.layoutWidth}</div>
            )}
          </div>
          <div className="col">
            <label className="form-label">Layout height</label>
            <input
              type="number"
              name="layoutHeight"
              className={`form-control ${errors.layoutHeight ? "is-invalid" : ""}`}
              value={form.layoutHeight}
              onChange={handleChange}
              min={1}
              placeholder="rows"
            />
            {errors.layoutHeight && (
              <div className="invalid-feedback">{errors.layoutHeight}</div>
            )}
          </div>
        </div>

        {errors.api && (
          <div className="alert alert-danger py-2 small">{errors.api}</div>
        )}

        <div className="d-flex gap-2 justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(`/admin/buildings/${id}`)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Saving…" : "Add room"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRoom;

import { useState } from "react";
import { editRoomLayoutById } from "../../services/api/admin";

function RoomDimensionsForm({
  roomId,
  currentWidth,
  currentHeight,
  onSuccess,
}) {
  const [newWidth, setNewWidth] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const parsedWidth = parseInt(newWidth, 10);
    const parsedHeight = parseInt(newHeight, 10);

    if (!newWidth || !newHeight) {
      setError("Both width and height are required.");
      return;
    }
    if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
      setError("Width and height must be valid numbers.");
      return;
    }
    if (parsedWidth < 1 || parsedHeight < 1) {
      setError("Width and height must be at least 1.");
      return;
    }

    setSubmitting(true);
    try {
      const w = String(parsedWidth);
      const h = String(parsedHeight);
      await editRoomLayoutById(roomId, { newWidth: w, newHeight: h });
      setSuccess("Room dimensions updated successfully.");
      setNewWidth("");
      setNewHeight("");
      onSuccess?.(parsedWidth, parsedHeight);
    } catch (err) {
      setError("Failed to update room dimensions. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="edit-form">
      <h3>Change Room Dimensions</h3>
      <p>
        Current dimensions: {currentWidth}W &times; {currentHeight}H
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">New Width</label>
          <input
            type="number"
            min="1"
            value={newWidth}
            onChange={(e) => setNewWidth(e.target.value)}
            placeholder={`Current: ${currentWidth}`}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">New Height</label>
          <input
            type="number"
            min="1"
            value={newHeight}
            onChange={(e) => setNewHeight(e.target.value)}
            placeholder={`Current: ${currentHeight}`}
            className="form-control"
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : "Update Dimensions"}
        </button>
      </form>
    </div>
  );
}

export default RoomDimensionsForm;

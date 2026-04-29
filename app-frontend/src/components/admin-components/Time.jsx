function Time({ handleChange, building, formData }) {
  return (
    <>
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
    </>
  );
}

export default Time;

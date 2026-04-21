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
          <option value="1.5">1 Hour 30 Minutes</option>
          <option value="2">2 Hours</option>
        </select>
      </div>
    </>
  );
}

export default Time;

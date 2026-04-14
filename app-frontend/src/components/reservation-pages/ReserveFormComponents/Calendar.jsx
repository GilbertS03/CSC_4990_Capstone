function Calendar({ handleChange, formData }) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Reservation Date</label>
        <input
          type="date"
          name="reservationDate"
          value={formData.reservationDate}
          onChange={handleChange}
          className="form-control"
          required
          min={new Date().toISOString().split("T")[0]} // today's date as "YYYY-MM-DD"
          max={
            new Date(new Date().setDate(new Date().getDate() + 7))
              .toISOString()
              .split("T")[0]
          } // 1 week from now
        />
      </div>
    </>
  );
}

export default Calendar;

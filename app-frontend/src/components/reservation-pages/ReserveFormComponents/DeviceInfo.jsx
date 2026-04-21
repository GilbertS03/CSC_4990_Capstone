function DeviceInfo({ device }) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label fw-semibold">Device</label>
        <input
          type="text"
          className="form-control"
          value={`${device.deviceType} #${device.deviceId}`}
          disabled
        />
      </div>
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
    </>
  );
}

export default DeviceInfo;

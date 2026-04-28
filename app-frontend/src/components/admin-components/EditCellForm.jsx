import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  moveDevice,
  getDeviceLocations,
  editDevice,
  getDeviceStatuses,
  getDeviceTypes,
} from "../../services/api/admin";

function EditCellForm({
  device,
  row,
  col,
  onCancel,
  onSave,
  maxRowSize,
  maxColSize,
  roomId,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [unplacedDevices, setUnplacedDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [formData, setFormData] = useState({
    xPosition: col,
    yPosition: row,
  });
  const [deviceStatuses, setDeviceStatuses] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);

  useEffect(() => {
    setFormData({ xPosition: col, yPosition: row });
  }, [row, col]);

  // Fetch unplaced devices only when cell is empty
  useEffect(() => {
    if (!device) {
      const fetchUnplaced = async () => {
        setLoading(true);
        try {
          const res = await getDeviceLocations(0);
          const res1 = await getDeviceStatuses();
          setDeviceStatuses(res1.data);
          const res2 = await getDeviceTypes();
          setDeviceTypes(res2.data);
          setUnplacedDevices(res.data);
        } catch (err) {
          console.error("Error fetching unplaced devices:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchUnplaced();
    }
  }, [device]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  // Move an existing device to new coordinates
  const handleMoveSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await moveDevice(device.deviceId, formData);
    } catch (err) {
      console.error("Error moving device:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Place an unplaced device into this cell
  const handlePlaceSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDeviceId) return;
    setLoading(true);
    setError(false);
    const selectedDevice = unplacedDevices.find(
      (d) => d.deviceId == selectedDeviceId,
    );
    const matchedType = deviceTypes.find(
      (dt) => dt.deviceType === selectedDevice.deviceType,
    );
    const matchedStatus = deviceStatuses.find(
      (ds) => ds.deviceStatus === "available",
    );
    try {
      await editDevice(selectedDeviceId, {
        deviceTypeId: matchedType.deviceTypeId,
        deviceStatusId: matchedStatus.deviceStatusId,
      });
      await moveDevice(selectedDeviceId, {
        xPosition: col,
        yPosition: row,
        roomId: roomId,
      });
      onSave();
    } catch (err) {
      console.error("Error placing device:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                {device
                  ? `Move Device — ${device.deviceType}`
                  : `Place Device at (${col}, ${row})`}
              </h5>
              {device && (
                <NavLink
                  to={`/admin/devices/edit/${device.deviceId}`}
                  className="btn btn-sm btn-outline-light"
                >
                  Edit device details →
                </NavLink>
              )}
            </div>

            <div className="card-body">
              {error && (
                <div className="alert alert-danger">
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Cell has a device — show move form */}
              {device ? (
                <form onSubmit={handleMoveSubmit}>
                  <div className="mb-4">
                    <p className="mb-1">
                      <span className="fw-semibold">Type: </span>
                      {device.deviceType}
                    </p>
                    <p className="mb-0 text-muted">
                      <small>
                        Current position: ({col}, {row})
                      </small>
                    </p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      New X Position
                    </label>
                    <input
                      type="number"
                      name="xPosition"
                      value={formData.xPosition}
                      onChange={handleChange}
                      className="form-control"
                      min={0}
                      max={maxColSize}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      New Y Position
                    </label>
                    <input
                      type="number"
                      name="yPosition"
                      value={formData.yPosition}
                      onChange={handleChange}
                      className="form-control"
                      min={0}
                      max={maxRowSize}
                      required
                    />
                  </div>

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
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Moving...
                        </>
                      ) : (
                        "Move Device"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Cell is empty — show unplaced device picker */
                <form onSubmit={handlePlaceSubmit}>
                  {loading ? (
                    <div className="text-center py-3">
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Loading available devices...
                    </div>
                  ) : unplacedDevices.length === 0 ? (
                    <div className="alert alert-secondary">
                      No unplaced devices available.
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Select a Device to Place Here
                      </label>
                      <select
                        className="form-select"
                        value={selectedDeviceId}
                        onChange={(e) => setSelectedDeviceId(e.target.value)}
                        required
                      >
                        <option value="">-- Select a device --</option>
                        {unplacedDevices.map((d) => (
                          <option key={d.deviceId} value={d.deviceId}>
                            #{d.deviceId} — {d.deviceType}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

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
                      disabled={loading || !selectedDeviceId}
                    >
                      Place Device Here
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

export default EditCellForm;

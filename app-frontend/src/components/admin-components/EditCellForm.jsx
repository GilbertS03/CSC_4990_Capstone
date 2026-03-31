import { useState, useEffect } from "react";

function EditCellForm({ device, row, col, onSave, onCancel }) {
  const [hasDevice, setHasDevice] = useState(!!device);

  const [formData, setFormData] = useState({
    deviceType: "",
    deviceStatus: "available",
  });

  const [loading, setLoading] = useState(false);

  // Populate form when device loads (important for async fetch)
  useEffect(() => {
    if (device) {
      setHasDevice(true);
      setFormData({
        deviceType: device.deviceType || "",
        deviceStatus: device.deviceStatus || "available",
      });
    } else {
      setHasDevice(false);
      setFormData({
        deviceType: "",
        deviceStatus: "available",
      });
    }
  }, [device]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    // try {
    //   await onSave({
    //     row,
    //     col,
    //     hasDevice,
    //     ...formData,
    //   });
    // } catch (err) {
    //   console.error("Error saving cell:", err);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                Edit Cell ({row}, {col})
              </h5>
            </div>

            <div className="card-body">
              {/* Cell Type */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Cell Type</label>

                <select
                  className="form-select"
                  value={hasDevice ? "device" : "empty"}
                  onChange={(e) => setHasDevice(e.target.value === "device")}
                >
                  <option value="empty">Empty</option>
                  <option value="device">Device</option>
                </select>
              </div>

              {/* Device Fields */}
              {hasDevice && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Device Type</label>
                    <input
                      type="text"
                      name="deviceType"
                      value={formData.deviceType}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Gaming PC, Console, etc."
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      name="deviceStatus"
                      value={formData.deviceStatus}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>

                  {/* Status Preview */}
                  <div
                    className={`alert mt-3 ${
                      formData.deviceStatus === "available"
                        ? "alert-success"
                        : formData.deviceStatus === "reserved"
                          ? "alert-danger"
                          : "alert-dark"
                    }`}
                  >
                    Preview: {formData.deviceStatus}
                  </div>
                </>
              )}

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
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCellForm;

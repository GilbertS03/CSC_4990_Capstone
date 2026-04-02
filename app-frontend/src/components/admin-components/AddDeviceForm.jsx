import { useState } from "react";
import { useNavigate } from "react-router-dom";
//TODO finish this component once the endpoint is created so that we can create new devices
function AddDeviceForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    deviceType: "",
    deviceStatus: "available",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onCancel = () => {
    navigate(-1);
  };

  //TODO finish this once I we get the backend endpoints I need up which are /device/create

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Yippee!!!");
    // setLoading(true);

    // try {
    //   await onCreate({
    //     ...formData,
    //     roomId: 0,
    //     positionX: -1,
    //     positionY: -1,
    //   });

    //   // optional: reset form after creation
    //   setFormData({
    //     deviceType: "",
    //     deviceStatus: "available",
    //   });
    // } catch (err) {
    //   console.error("Error creating device:", err);
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
              <h5 className="mb-0">Add New Device</h5>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Device Type */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Device Type</label>
                  <input
                    type="text"
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Gaming PC, Console, VR Station..."
                    required
                  />
                </div>

                {/* Device Status */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Initial Status
                  </label>
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

                {/* Info Note */}
                <div className="alert alert-secondary">
                  This device will be created <strong>unplaced</strong> and can
                  be assigned to a grid cell later.
                </div>

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
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating...
                      </>
                    ) : (
                      "Create Device"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDeviceForm;

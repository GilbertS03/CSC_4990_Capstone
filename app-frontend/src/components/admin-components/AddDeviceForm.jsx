import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { createDevice } from "../../services/api/admin";

function AddDeviceForm() {
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setDeviceType(e.target.value);
    console.log(deviceType);
  };

  const onCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createDevice({
        deviceTypeId: deviceType,
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error creating device:", err);
    } finally {
      setLoading(false);
      if (!error) {
        navigate(-1);
      } else {
        setError(false);
        return;
      }
    }
  };

  return (
    <div className="container py-5">
      <p>
        <NavLink to={"/admin/devices"}>&larr; Go Back</NavLink>
      </p>
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
                  <select
                    value={deviceType}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value={1}>Gaming PC</option>
                    <option value={2}>Desktop PC</option>
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

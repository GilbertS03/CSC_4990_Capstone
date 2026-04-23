import { useEffect, useState } from "react";
import { getSettings } from "../../services/api/admin";
function AdminSettings() {
  const [settingsArr, setSettingsArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const MIN_VALUE = 10;

  const validateValue = (value) => {
    if (value <= MIN_VALUE) {
      return alert(`Value must be larger than ${MIN_VALUE}!`);
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        setSettingsArr(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);
  const formatLabel = (str) =>
    str.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Occured. Please try again.</p>;
  return (
    <div className="text-center">
      <h1>System Settings</h1>
      <div className="container d-flex flex-column justify-content-center table-responsive">
        <table className="table table-dark table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Setting</th>
              <th>Value</th>
              <th>Submit Button</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(settingsArr).map((key) => (
              <tr key={key}>
                <td>{formatLabel(settingsArr[key].settingName)}</td>
                <td>
                  <input
                    value={settingsArr[key].settingValue}
                    className="form-control w-100"
                  />
                </td>
                <td>
                  {/* TODO Find out what to put here for the submit button */}
                  <button
                    className="btn btn-primary"
                    type="button" /*onClick={}*/
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSettings;

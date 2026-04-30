import { useEffect, useState } from "react";
import { getSettings, setSettingsById } from "../../services/api/admin";

function AdminSettings() {
  const [settingsArr, setSettingsArr] = useState([]);
  const [editedValues, setEditedValues] = useState({}); // tracks unsaved changes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const MIN_VALUE = 0;

  const validateValue = (value) => {
    if (value < MIN_VALUE) {
      alert(`Value must be larger than ${MIN_VALUE}!`);
      return false;
    }
    return true;
  };

  const handleChange = (key, value) => {
    setEditedValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (key) => {
    const settingName = settingsArr[key].settingName;
    const newValue = parseInt(
      editedValues[key] ?? settingsArr[key].settingValue,
      10,
    );

    if (isNaN(newValue) || !validateValue(newValue)) return;

    try {
      await setSettingsById(String(settingName), newValue);
      setSettingsArr((prev) => ({
        ...prev,
        [key]: { ...prev[key], settingValue: newValue },
      }));
      alert("Updated settings correctly");
    } catch (err) {
      console.error(err);
      alert("Failed to update setting.");
    }
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
                    type="number"
                    value={editedValues[key] ?? settingsArr[key].settingValue}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="form-control w-100"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleSubmit(key)}
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

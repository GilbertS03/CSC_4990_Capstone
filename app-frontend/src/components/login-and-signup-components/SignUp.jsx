//functions
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateSignUp } from "../../utils/validation";
import { useAuth } from "../../context/AuthContext";

//components
import PasswordField from "./PasswordField";
import EmailField from "./EmailField";
import FirstNameField from "./FirstNameField";
import LastNameField from "./LastNameField";

//CSS
import "../../App.css";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    //Prevent refresh
    event.preventDefault();

    //Validating email and password fields
    const validationErrors = validateSignUp(form);

    //Checks if any keys exist and if it does then no signing up
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await signup(
      form.firstName,
      form.lastName,
      form.emailAddress,
      form.password,
    );

    if (!result.success) {
      setErrors({ general: result.message });
      return;
    }

    //signup succeeded, navigate to success
    navigate("/");
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <h2 className="mb-3">Sign Up</h2>
      <form className="w-50" onSubmit={handleSubmit}>
        <FirstNameField
          value={form.firstName}
          onChange={(value) => handleChange("firstName", value)}
          error={errors.firstName}
        />
        <LastNameField
          value={form.lastName}
          onChange={(value) => handleChange("lastName", value)}
          error={errors.lastName}
        />
        <EmailField
          value={form.emailAddress}
          onChange={(value) => handleChange("emailAddress", value)}
          error={errors.emailAddress}
        />
        <PasswordField
          value={form.password}
          onChange={(value) => handleChange("password", value)}
          error={errors.password}
        />

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
        {errors.general && (
          <div className="loginPageError mt-3">{errors.general}</div>
        )}
      </form>
    </div>
  );
}
export default Signup;

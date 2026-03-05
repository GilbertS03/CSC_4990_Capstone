//functions
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../../utils/validation';
import { useAuth } from '../../context/AuthContext';

//components
import PasswordField from './PasswordField'
import EmailField from './EmailField';
import { NavLink } from 'react-router-dom';

//CSS
import '../../App.css';

function Login(){
  const navigate = useNavigate();
  const { login } = useAuth();

  const [ form, setForm ] = useState( {
    emailAddress: '',
    password: ''
  });

  const [ errors, setErrors ] = useState({});

  const handleSubmit = async (event) => {
    //Prevent refresh
    event.preventDefault();

    //Validating email and password fields
    const validationErrors = validateLogin(form)

    //Checks if any keys exist and if it does then no logging in
    if(Object.keys(validationErrors).length > 0){
      setErrors(validationErrors);
      return;
    }

    //performing login
    const result = await login(form.emailAddress, form.password);

    if(!result.success){
      setErrors({ general: result.message });
      return;
    }
    
    //success means redirect
    navigate('/')
    
  }

  const handleChange = (field, value) => {
    setForm( prev => ({
      ...prev,
      [field]: value
    }));
  };

    return (
      <div className='d-flex flex-column align-items-center w-100'>
        <h2 className='mb-3'>Login</h2>
        <form className='w-50' onSubmit={handleSubmit}>
          <EmailField
            value={form.emailAddress}
            onChange={(value) => handleChange('emailAddress', value)}
            error={errors.emailAddress}
          />
          <PasswordField 
            value={form.password}
            onChange={(value) => handleChange('password', value)}
            error={errors.password}
          />

          <button type="submit" className="btn btn-primary mt-3">Submit</button>
          {errors.general && (
            <div className='loginPageError mt-3'>
              {errors.general}
            </div>
          )}
        </form>
        <div className='mt-3 w-50'><NavLink to='/signup' end>Create Account</NavLink></div>
      </div>
    )
}

export default Login;
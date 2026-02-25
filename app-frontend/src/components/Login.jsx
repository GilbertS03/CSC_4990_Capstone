import { useState } from 'react';
import '../App.css';
import PasswordField from './PasswordField'
import EmailField from './EmailField';

function Login(){ 
  const [ emailAddress, setEmailAddress ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailError, setEmailError ] = useState(false);

  const handleEmail = (data) => {
    setEmailAddress(data[0]); 
    setEmailError(data[1]);
    console.log(data);
  }
  const handlePassword = (data) => {
    setPassword(data);
  }

  const handleSubmit = async () => {
    e.preventDefault();
    const response = fetch('')
  }
  
    return (
      <div className='d-flex justify-content-center'>
        <form className='md-w-25' onSubmit={handleSubmit}>
          <EmailField sendDataToLogin={handleEmail} />
          <PasswordField sendDataToLogin={handlePassword} />

          <button type="submit" className="btn btn-primary mt-3">Submit</button>
          <div className='loginPageError mt-3'>
            Email or password incorrect. Try again.
          </div>
        </form>
      </div>
    )
}

export default Login;
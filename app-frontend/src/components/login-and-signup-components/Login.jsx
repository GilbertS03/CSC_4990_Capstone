import { useState } from 'react';
import '../../App.css';
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
  const handlePassword = (data) => {setPassword(data);}

  //todo work on the fecth and logging in, need backend endpoint before can complete this.
  const handleSubmit = async (event) => {
    e.preventDefault();
    try{
      const response = await fetch('loginroute', {
        method: 'POST',
        headers: {
          //This is for fastapi, change when this is figured out
          'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          //Change as needed
          username: emailAddress,
          password: password,
        })
      });

      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      console.log('Login successful');

    }
    catch (e){
      console.log(e.message);
    }
  }
  
    return (
      <div className='d-flex flex-column align-items-center w-100'>
        <h2 className='mb-3'>Login</h2>
        <form className='w-50' onSubmit={handleSubmit}>
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
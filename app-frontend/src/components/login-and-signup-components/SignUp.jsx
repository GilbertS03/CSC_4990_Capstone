import { useState } from 'react'
import EmailField from "./EmailField";
import PasswordField from './PasswordField';
import '../../App.css';
function Signup(){
    const [ emailAddress, setEmailAddress ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailError, setEmailError ] = useState(false);

    const handleEmail = (data) => {
    setEmailAddress(data[0]); 
    setEmailError(data[1]);
    console.log(data);
    }
    const handlePassword = (data) => {setPassword(data);}
    
    return(
        <div className='d-flex flex-column align-items-center w-100'>
            <h2 className='mb-3'>Signup</h2>
            <form className='w-50'>
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
export default Signup;
import {useState} from 'react'
function Password({sendDataToLogin}){

    const handlePasswordChange = (e) => {
        setPasswordInputValue(e.target.value);
        sendDataToLogin(e.target.value);
    }


    const [ passwordInputValue, setPasswordInputValue ] = useState('');

    return (
        <div>
            <label className="form-label">Password:</label>
            <input 
            type='password'
            value={passwordInputValue} 
            onChange={handlePasswordChange} 
            className="form-control" 
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}/>
        </div>
    )
}

export default Password;
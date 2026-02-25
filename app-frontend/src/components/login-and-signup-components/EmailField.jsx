import { useState, useEffect } from 'react';

function EmailField({ sendDataToLogin }){

    const [ emailInputValue, setEmailInputValue ] = useState('');
    const [ renderError, setRenderError ] = useState(false);

    useEffect(()=>{
        if(!emailInputValue.includes('@') || !emailInputValue.includes('.edu'))
            setRenderError(true);
        else
            setRenderError(false);
    }, [emailInputValue])

    const handleEmailChange = (e) => {
        setEmailInputValue(e.target.value);
        const data = [e.target.value, renderError ];
        sendDataToLogin(data);

    }
    return(
        <div className="mb-3">
            <label className="form-label">Email address:</label>
            <input 
            type="email" 
            className="form-control" 
            value={emailInputValue} 
            onChange={handleEmailChange} 
            placeholder='email@school.edu' 
            aria-describedby="emailHelp"/>
            <span className='loginPageError' style={renderError ? {display: 'block'} : {display: 'none'}}>Email must contain @school.edu</span>
        </div>
    )
}

export default EmailField;
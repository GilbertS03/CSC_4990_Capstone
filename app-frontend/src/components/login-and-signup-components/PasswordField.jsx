import { useState } from 'react'

function PasswordField ({ value, onChange, error }) {
    const [showPassword, setShowPassword ] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    return(
        <div className='mb-3'>
            <label className='form-label'>Password:</label>
            <div className='input-group'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    className='form-control'
                />
                <button 
                    type='button' 
                    onClick={handleTogglePassword}
                    className='btn btn-light'>
                    {showPassword ? 'Hide' : 'Show'} Password
                </button>
            </div>

            {error && (
                <div className='loginPageError'>
                    {error}
                </div>
            )}
        </div>
    );
}

export default PasswordField;
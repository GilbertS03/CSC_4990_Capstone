function PasswordField ({ value, onChange, error }) {
    return(
        <div className='mb-3'>
            <label className='form-label'>Password:</label>

            <input
                type='password'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                className='form-control'
            />

            {error && (
                <div className='loginPageError'>
                    {error}
                </div>
            )}
        </div>
    );
}

export default PasswordField;
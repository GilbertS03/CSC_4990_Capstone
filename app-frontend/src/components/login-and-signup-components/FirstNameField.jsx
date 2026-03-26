function FirstNameField( { value, onChange, error } ){
    return (
        <div className="mb-3">
            <label className="form-label">First Name:</label>

            <input
                className="form-control"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Christopher"
            />
            {error && (
                <span className="loginPageError">
                {error}
                </span>
            )}
        </div>
    )
}

export default FirstNameField;

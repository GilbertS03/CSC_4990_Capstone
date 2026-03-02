function LastNameField( { value, onChange, error } ){
    return(
        <div className="mb-3">
            <label className="form-label">Last Name:</label>

            <input
                className="form-control"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Maldonado"
            />
            {error && (
                <span className="loginPageError">
                {error}
                </span>
            )}
        </div>
    )
}

export default LastNameField;

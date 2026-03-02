function EmailField({ value, onChange, error }) {
    return (
        <div className="mb-3">
            <label className="form-label">Email address:</label>

            <input
                className="form-control"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="email@school.edu"
            />
            {error && (
                <span className="loginPageError">
                {error}
                </span>
            )}
        </div>
    );
}

export default EmailField;

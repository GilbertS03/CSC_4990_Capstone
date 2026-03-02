const MIN_CHARS_PW = 8;
export function validateLogin( { emailAddress, password }) {
    const errors = {};

    if(!emailAddress?.trim()){
        errors.emailAddress = 'Email is required';
    }
    if(!emailAddress.includes('@') || !emailAddress.endsWith('.com') || emailAddress.charAt(0) === '@'){
        errors.emailAddress = 'Incorrect email format'
    }
    if(!password){
        errors.password = 'Password is required';
    }
    
    console.log(errors)
    return errors;
}

export function validateSignUp( { firstName, lastName, emailAddress, password }) {
    const errors = {};
    if(!firstName?.trim()){
        errors.firstName = 'First name field must not be left blank';
    }

    if(!lastName?.trim()){
        'Last name field must not be left blank';
    }

    if(!emailAddress?.trim()){
        errors.email = 'Email is required';
    }

    else if(!/\S+@\S+\.\S+/.test(emailAddress)){
        errors.emailAddress = "Invalid email format"
    }
    
    if(!password?.trim()){
        errors.password = 'Password is required';
    }

    else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8}$/.test(password)){
        errors.password = `Password must be at least ${MIN_CHARS_PW} characters, one upper and one lower`;
    }

    return errors;

}

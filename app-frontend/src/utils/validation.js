const MIN_CHARS_PW = 10;
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

export function validateSignUp( { emailAddress, password }) {
    const errors = {};

    if(!emailAddress?.trim()){
        errors.email = 'Email is required';
    }
    else if(!/\S+@\S+\.\S+/.test(emailAddress)){
        errors.emailAddress = "Invalid email format"
    }
    if(!password){
        errors.password = 'Password is required';
    }
    else if (password.length < MIN_CHARS_PW){
        errors.password = `Password must be at least ${MIN_CHARS_PW} characters`;
    }

}

export const checkValidData=(email,password)=>{
    const isValidEmail=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)

    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    
    if(!isValidEmail) return 'Email is not valid';
    if(!isPasswordValid) return 'Password is not valid'

    return null;
}
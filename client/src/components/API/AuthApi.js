import axios from 'axios'

// SignIn API
export const SignInAuth =async(account)=>{
    const res = await axios.post('http://localhost:5000/auth/signin',account);
    return res;
}
// SignUp API
export const SignUpAuth =async(account)=>{
    const res = await axios.post('http://localhost:5000/auth/signup',account);
    return res;
}
// Get user data API
export const userAuth = async(id)=>{
    const res = await axios.get(`http://localhost:5000/auth/user/${id}`);
    return res.data;
}
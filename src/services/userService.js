import axios from "axios"

const RegisterNewUser = async(data)=>{
    return await axios.post('http://localhost:8080/api/v1/register',data )
}

const LoginUser = async(LoginValue,password)=>{
    return await axios.post('http://localhost:8080/api/v1/login',
    {
        LoginValue , password
    }
    )
}



export {RegisterNewUser ,LoginUser}
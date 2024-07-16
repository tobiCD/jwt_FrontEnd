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

const fetAllUser = async(page ,limit)=>{
    return await axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&&limit=${limit}`)
}
const deleteUser = async (userId)=>{
    return await axios.delete(`http://localhost:8080/api/v1/user/delete/${userId}`)
}




export {RegisterNewUser ,LoginUser ,fetAllUser,deleteUser }
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:1212"
});

export default api;


export const registerUser = async (userData) => {
    const response = await api.post("/signup", userData);
    return response.data;
};

export const loginUser=async(userData)=>{
    const response=await api.post('/login',userData)
    return response.data
}
export const adminLogin=async (userData)=>{
    const response=await api.post('/adminlogin',userData)
    console.log(response)
    return response.data
}
export const createProduct=async(productData)=>{
    const response=await api.post('/products',productData)
    return response.data
}
export const getAllProduct=async()=>{
    const response=await api.get('/products')
    return response.data
}
export const createStore=async(storeData)=>{
    const response=await api.post('/store',storeData)
    return response.data
}
export const getAllStore=async()=>{
    const response=await api.get('/store')
    return response.data
}
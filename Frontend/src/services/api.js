import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:1212"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;

export const registerUser = async (userData) => {
    const response = await api.post("/signup", userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await api.post("/login", userData);
    return response.data;
};

export const adminLogin = async (userData) => {
    const response = await api.post("/adminlogin", userData);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post("/product", productData);
    return response.data;
};

export const getAllProduct = async () => {
    const response = await api.get("/product");
    return response.data;
};

export const createStore = async (storeData) => {
    const response = await api.post("/store", storeData);
    return response.data;
};

export const getAllStore = async () => {
    const response = await api.get("/store");
    return response.data;
};

export const createStock = async (stockData) => {
    const response = await api.post("/stock", stockData);
    return response.data;
};

export const getAllStock = async (threshold) => {
    const response = await api.get("/stock", { params: { threshold } });
    return response.data;
};

export const editStock = async (stockData) => {
    const response = await api.put("/stock", stockData);
    return response.data;
};

export const createTransfer = async (transferData) => {
    const response = await api.post("/transfer", transferData);
    return response.data;
};

export const getTransfers = async () => {
    const response = await api.get("/transfer");
    return response.data;
};
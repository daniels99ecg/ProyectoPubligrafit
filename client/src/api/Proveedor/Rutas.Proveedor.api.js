import axios from 'axios'
const baseURL = import.meta.env.VITE_REACT_API_URL;


export const getListarProveedor=async ()=>{
    return await axios.get(`${baseURL}proveedor`)
  }
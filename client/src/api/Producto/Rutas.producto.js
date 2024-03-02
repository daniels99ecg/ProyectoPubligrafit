import axios from "axios"

const baseURL = import.meta.env.VITE_REACT_API_URL;


export const  postCreateProducto=async (taks)=>{
    return await axios.post(`${baseURL}producto/create`,taks
)
}

export const  getListarProductos=async ()=>{
    return await axios.get(`${baseURL}producto`)
}

export const  getListarProducto=async (id_producto)=>{
    return await axios.get(`${baseURL}producto/${id_producto}`)
}

export const  putActualizarProductos=async (id_producto, taks)=>{
  
    return await axios.put(`${baseURL}producto/update/${id_producto}`,taks)
}
export const eliminarProducto= async (id_producto) => {
    return await axios.delete(`${baseURL}producto/delete/${id_producto}`);
}

export const putDesactivarProducto = async (id_producto) => {
    return await axios.put(`${baseURL}producto/disable/${id_producto}`);
}

export const putActivarProducto = async (id_producto) => {
    return await axios.put(`${baseURL}producto/activate/${id_producto}`);
}



export const  getListarcategoria=async ()=>{
    return await axios.get(`${baseURL}producto/categorias`)
}
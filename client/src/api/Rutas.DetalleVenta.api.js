import axios from "axios";
const baseURL = import.meta.env.VITE_REACT_API_URL;


export const getMostarDetalles = async () => {
    return await axios.get(`${baseURL}detalleVenta`) 
}

export const getDetallesOne = async (id_detalle_venta) => {
    return await axios.get(`${baseURL}detalleVenta/detalle/${id_detalle_venta}`) 
}
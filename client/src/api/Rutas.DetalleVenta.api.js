import axios from "axios";

export const getMostarDetalles = async () => {
    return await axios.get('http://localhost:3001/detalleVenta') 
}

export const getDetallesOne = async (id_detalle_venta) => {
    return await axios.get(`http://localhost:3001/detalleVenta/detalle/${id_detalle_venta}`) 
}
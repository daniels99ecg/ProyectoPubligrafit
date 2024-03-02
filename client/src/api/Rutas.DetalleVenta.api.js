import axios from "axios";

export const getMostarDetalles = async () => {
    return await axios.get('https://danielg99.alwaysdata.net/detalleVenta') 
}

export const getDetallesOne = async (id_detalle_venta) => {
    return await axios.get(`https://danielg99.alwaysdata.net/detalleVenta/detalle/${id_detalle_venta}`) 
}
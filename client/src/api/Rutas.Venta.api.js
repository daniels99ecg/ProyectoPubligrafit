import axios from "axios";

export const getListarVentas = async () => {
    return await axios.get('http://localhost:3001/venta') 
}

export const getListaVenta = async (id_venta) => {
    return await axios.get(`http://localhost:3001/venta/ventaOne/${id_venta}`) 
}

export const postCreateVentas = async (task) => {
    return await axios.post('http://localhost:3001/venta/create', task)
}
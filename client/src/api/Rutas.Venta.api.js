import axios from "axios";


const baseURL = import.meta.env.VITE_REACT_API_URL;


export const getListarVentas = async () => {
    return await axios.get(`${baseURL}venta`) 
}

export const getListarVentasDia = async () => {
    return await axios.get(`${baseURL}venta/ventadia`) 
    
  };

  export const getListarVentasdelDia = async () => {
    return await axios.get(`${baseURL}venta/ventadeldia`) 
    
  };
 
export const getListaVenta = async (id_venta) => {
    return await axios.get(`${baseURL}venta/ventaOne/${id_venta}`) 
}

export const postCreateVentas = async (task) => {
    return await axios.post(`${baseURL}venta/create`, task)
}


export const getListarVentadelDia = async () => {
  return await axios.get(`${baseURL}venta/ventames`) 
  
};



export const getListarVentadelDiasemana = async () => {
  return await axios.get(`${baseURL}venta/ventasemana`) 
  
};
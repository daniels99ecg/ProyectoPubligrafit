import axios from "axios";

export const getListarVentas = async () => {
    return await axios.get('http://localhost:3001/venta') 
}

export const getListarVentasDia = async () => {
    return await axios.get('http://localhost:3001/venta/ventadia') 
    
  };

  export const getListarVentasdelDia = async () => {
    return await axios.get('http://localhost:3001/venta/ventadeldia') 
    
  };
 
export const getListaVenta = async (id_venta) => {
    return await axios.get(`http://localhost:3001/venta/ventaOne/${id_venta}`) 
}

export const postCreateVentas = async (task) => {
    return await axios.post('http://localhost:3001/venta/create', task)
}


export const getListarVentadelDia = async () => {
  return await axios.get('http://localhost:3001/venta/ventames') 
  
};



export const getListarVentadelDiasemana = async () => {
  return await axios.get('http://localhost:3001/venta/ventasemana') 
  
};
import axios from "axios";

export const getListarVentas = async () => {
    return await axios.get('https://danielg99.alwaysdata.net/venta') 
}

export const getListarVentasDia = async () => {
    return await axios.get('https://danielg99.alwaysdata.net/venta/ventadia') 
    
  };

  export const getListarVentasdelDia = async () => {
    return await axios.get('https://danielg99.alwaysdata.net/venta/ventadeldia') 
    
  };
 
export const getListaVenta = async (id_venta) => {
    return await axios.get(`https://danielg99.alwaysdata.net/venta/ventaOne/${id_venta}`) 
}

export const postCreateVentas = async (task) => {
    return await axios.post('https://danielg99.alwaysdata.net/venta/create', task)
}


export const getListarVentadelDia = async () => {
  return await axios.get('https://danielg99.alwaysdata.net/venta/ventames') 
  
};



export const getListarVentadelDiasemana = async () => {
  return await axios.get('https://danielg99.alwaysdata.net/venta/ventasemana') 
  
};
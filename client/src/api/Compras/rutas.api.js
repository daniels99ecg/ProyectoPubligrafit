import axios from 'axios'

const baseURL = import.meta.env.VITE_REACT_API_URL;


export const getListarCompras=async()=>{
    return await axios.get(`${baseURL}compras`)
}
export const postCrearCompras=async(task)=>{
    return await axios.post(`${baseURL}compras/create`,task)
}

export const getListaCompra = async (id_compra) => {
    return await axios.get(`${baseURL}compras/compraOne/${id_compra}`) 
}

export const getListarCompraDia = async () => {
    return await axios.get(`${baseURL}compras/compradia`) 
    
  };
  export const getListarCompradelDia = async () => {
    return await axios.get(`${baseURL}compras/compradeldia`) 
    
  };

  export const getListarCompraseman = async () => {
    return await axios.get(`${baseURL}compras/comprasemana`) 
    
  };
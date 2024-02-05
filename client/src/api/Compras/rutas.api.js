import axios from 'axios'


export const getListarCompras=async()=>{
    return await axios.get('http://localhost:3001/compras')
}
export const postCrearCompras=async(task)=>{
    return await axios.post('http://localhost:3001/compras/create',task)
}

export const getListaCompra = async (id_compra) => {
    return await axios.get(`http://localhost:3001/compras/compraOne/${id_compra}`) 
}

export const getListarCompraDia = async () => {
    return await axios.get('http://localhost:3001/compras/compradia') 
    
  };
  export const getListarCompradelDia = async () => {
    return await axios.get('http://localhost:3001/compras/compradeldia') 
    
  };
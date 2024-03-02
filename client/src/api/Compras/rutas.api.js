import axios from 'axios'


export const getListarCompras=async()=>{
    return await axios.get('https://danielg99.alwaysdata.net/compras')
}
export const postCrearCompras=async(task)=>{
    return await axios.post('https://danielg99.alwaysdata.net/compras/create',task)
}

export const getListaCompra = async (id_compra) => {
    return await axios.get(`https://danielg99.alwaysdata.net/compras/compraOne/${id_compra}`) 
}

export const getListarCompraDia = async () => {
    return await axios.get('https://danielg99.alwaysdata.net/compras/compradia') 
    
  };
  export const getListarCompradelDia = async () => {
    return await axios.get('https://danielg99.alwaysdata.net/compras/compradeldia') 
    
  };

  export const getListarCompraseman = async () => {
    return await axios.get('https://danielg99.alwaysdata.net/compras/comprasemana') 
    
  };
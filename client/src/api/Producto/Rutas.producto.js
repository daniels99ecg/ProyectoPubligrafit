import axios from 'axios'


export const  postCreateProducto=async (taks)=>{
    return await axios.post('https://danielg99.alwaysdata.net/producto/create',taks
)
}

export const  getListarProductos=async ()=>{
    return await axios.get('https://danielg99.alwaysdata.net/producto')
}

export const  getListarProducto=async (id_producto)=>{
    return await axios.get(`https://danielg99.alwaysdata.net/producto/${id_producto}`)
}

export const  putActualizarProductos=async (id_producto, taks)=>{
  
    return await axios.put(`https://danielg99.alwaysdata.net/producto/update/${id_producto}`,taks)
}
export const eliminarProducto= async (id_producto) => {
    return await axios.delete(`https://danielg99.alwaysdata.net/producto/delete/${id_producto}`);
}

export const putDesactivarProducto = async (id_producto) => {
    return await axios.put(`https://danielg99.alwaysdata.net/producto/disable/${id_producto}`);
}

export const putActivarProducto = async (id_producto) => {
    return await axios.put(`https://danielg99.alwaysdata.net/producto/activate/${id_producto}`);
}



export const  getListarcategoria=async ()=>{
    return await axios.get('https://danielg99.alwaysdata.net/producto/categorias')
}
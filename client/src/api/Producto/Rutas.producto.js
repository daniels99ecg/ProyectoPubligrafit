import axios from 'axios'


export const  postCreateProducto=async (taks)=>{
    return await axios.post('http://localhost:3001/producto/create',taks, {
        headers:{'Content-Type':'multipart/form-data',
    },
})
}

export const  getListarProductos=async ()=>{
    return await axios.get('http://localhost:3001/producto')
}

export const  getListarProducto=async (id_producto)=>{
    return await axios.get(`http://localhost:3001/producto/${id_producto}`)
}

export const  putActualizarProductos=async (id_producto, taks)=>{
    return await axios.put(`http://localhost:3001/producto/update/${id_producto}`,taks)
}

export const eliminarProducto= async (id_producto) => {
    return await axios.delete(`http://localhost:3001/producto/delete/${id_producto}`);
}

export const putDesactivarProducto = async (id_producto) => {
    return await axios.put(`http://localhost:3001/producto/disable/${id_producto}`);
}

export const putActivarProducto = async (id_producto) => {
    return await axios.put(`http://localhost:3001/producto/activate/${id_producto}`);
}



export const  getListarcategoria=async ()=>{
    return await axios.get('http://localhost:3001/producto/categorias')
}
import axios from 'axios'

export const  postCreateProducto=async (taks)=>{
    return await axios.post('http://localhost:3001/producto/create',taks)
}
export const postCreateFichaTecnica=async (taks)=>{
    return await axios.post('http://localhost:3001/fichaTecnica/create',taks)
}
export const getListarProductos=async ()=>{
    return await axios.get('http://localhost:3001/producto')
}

export const  postCreateInsumo=async (taks)=>{
    return await axios.post('http://localhost:3001/insumo/create',taks)
}

export const getListarFichasTecnicas=async ()=>{
    return await axios.get('http://localhost:3001/fichaTecnica',taks)
}

export const  getListarInsumos=async ()=>{
    return await axios.get('http://localhost:3001/insumo')
}
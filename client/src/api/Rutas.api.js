import axios from 'axios'

export const getListarProductos=async ()=>{
    return await axios.get('http://localhost:3001/producto')
}

export const getListarFichasTecnicas=async ()=>{
    return await axios.get('http://localhost:3001/fichaTecnica')
}

export const  getListarInsumos=async ()=>{
    return await axios.get('http://localhost:3001/insumo')
}
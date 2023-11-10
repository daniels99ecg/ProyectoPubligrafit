import axios from 'axios'


export const getListarCompras=async()=>{
    return await axios.get('http://localhost:3001/compras')
}
export const postCrearCompras=async(task)=>{
    return await axios.post('http://localhost:3001/compras/create',task)
}
import axios from 'axios'


export const getListarCompras=async()=>{
    return await axios.get('http://localhost:3001/compras')
}
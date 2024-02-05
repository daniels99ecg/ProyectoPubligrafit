import axios from 'axios'


export const getListarProveedor=async ()=>{
    return await axios.get('http://localhost:3001/proveedor')
  }
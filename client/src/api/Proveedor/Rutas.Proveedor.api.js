import axios from 'axios'


export const getListarProveedor=async ()=>{
    return await axios.get('https://danielg99.alwaysdata.net/proveedor')
  }
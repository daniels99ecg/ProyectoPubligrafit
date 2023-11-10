import axios from 'axios'


export const getListarRoles=async ()=>{
    return await axios.get('http://localhost:3001/rol')
  }
  
  export const crearRol=async (task)=>{
    return await axios.post(`http://localhost:3001/rol/create`, task)
  }

  export const putDesactivarCliente = async (id_rol) => {
    return await axios.put(`http://localhost:3001/rol/disable/${id_rol}`);
  }
  
  export const putActivarCliente = async (id_rol) => {
    return await axios.put(`http://localhost:3001/rol/activate/${id_rol}`);
  }
  
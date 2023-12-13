import axios from 'axios'


export const getListarRoles=async ()=>{
    return await axios.get('http://localhost:3001/rol')
  }
  export const getListarRolesxPermiso=async ()=>{
    try {
    const response=await axios.get('http://localhost:3001/rol/rolxpermiso')
    return response.data
  } catch (error) {
    console.error('Error al obtener permisos:', error);
    return {};
  }
  }

  export const cargaractualizarRol=async (id_rol)=>{
    return await axios.get(`http://localhost:3001/rol/${id_rol}`)
  }

  export const actualizarRol=async (id_rol, task)=>{
    try{
   const response=await axios.put(`http://localhost:3001/rol/update/${id_rol}`, task);
   return response.data; // Devuelve los datos exitosos
  }catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };
  


  export const crearRol=async (task)=>{
    return await axios.post(`http://localhost:3001/rol/create`, task)
  }

export const listarPermiso=async ()=>{
  return await axios.get(`http://localhost:3001/rol/permiso`)

}

  export const putDesactivarCliente = async (id_rol) => {
    return await axios.put(`http://localhost:3001/rol/disable/${id_rol}`);
  }
  
  export const putActivarCliente = async (id_rol) => {
    return await axios.put(`http://localhost:3001/rol/activate/${id_rol}`);
  }
  export const eliminar = async (id_rol) => {
    return await axios.delete(`http://localhost:3001/rol/delete/${id_rol}`);
  }
  
  
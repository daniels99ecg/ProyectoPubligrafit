import axios from 'axios'


export const getListarRoles=async ()=>{
    return await axios.get('https://danielg99.alwaysdata.net/rol')
  }

export const getNewRol=async()=>{
  return await axios.get('https://danielg99.alwaysdata.net/rol/rolesnuevo')
}

  export const getListarRolesxPermiso=async ()=>{
    try {
    const response=await axios.get('https://danielg99.alwaysdata.net/rol/rolxpermiso')
    return response.data
  } catch (error) {
    console.error('Error al obtener permisos:', error);
    return {};
  }
  }

  export const cargaractualizarRol=async (fk_rol)=>{
    return await axios.get(`https://danielg99.alwaysdata.net/rol/${fk_rol}`)
  }

  export const actualizarRol=async (id_rol, task)=>{
    try{
   const response=await axios.put(`https://danielg99.alwaysdata.net/rol/update/${id_rol}`, task);
   return response.data; // Devuelve los datos exitosos
  }catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };
  


  export const crearRol=async (task)=>{
    try {
    const response= await axios.post(`https://danielg99.alwaysdata.net/rol/create`, task)
    return response.data
  } catch (error) {
    if (error.response) {
      
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
  }

  export const crearRolNuevo=async (task)=>{
    try {
    const response= await axios.post(`https://danielg99.alwaysdata.net/rol/create/nuevo`, task)
    return response.data
  } catch (error) {
    if (error.response) {
      
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
  }
export const listarPermiso=async ()=>{
  return await axios.get(`https://danielg99.alwaysdata.net/rol/permiso`)

}

  export const putDesactivarCliente = async (id_rol) => {
    return await axios.put(`https://danielg99.alwaysdata.net/rol/disable/${id_rol}`);
  }
  
  export const putActivarCliente = async (id_rol) => {
    return await axios.put(`https://danielg99.alwaysdata.net/rol/activate/${id_rol}`);
  }
  export const eliminar = async (id_rol) => {
    return await axios.delete(`https://danielg99.alwaysdata.net/rol/delete/${id_rol}`);
  }
  
  
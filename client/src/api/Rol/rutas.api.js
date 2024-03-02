import axios from 'axios'
const baseURL = import.meta.env.VITE_REACT_API_URL;


export const getListarRoles=async ()=>{
    return await axios.get(`${baseURL}rol`)
  }

export const getNewRol=async()=>{
  return await axios.get(`${baseURL}rol/rolesnuevo`)
}

  export const getListarRolesxPermiso=async ()=>{
    try {
    const response=await axios.get(`${baseURL}rol/rolxpermiso`)
    return response.data
  } catch (error) {
    console.error('Error al obtener permisos:', error);
    return {};
  }
  }

  export const cargaractualizarRol=async (fk_rol)=>{
    return await axios.get(`${baseURL}rol/${fk_rol}`)
  }

  export const actualizarRol=async (id_rol, task)=>{
    try{
   const response=await axios.put(`${baseURL}rol/update/${id_rol}`, task);
   return response.data; // Devuelve los datos exitosos
  }catch (error) {
      if (error.response) {
        
        return { error: `Error del servidor`, data: error.response.data };
      }
    }
  };
  


  export const crearRol=async (task)=>{
    try {
    const response= await axios.post(`${baseURL}rol/create`, task)
    return response.data
  } catch (error) {
    if (error.response) {
      
      return { error: `Error del servidor`, data: error.response.data };
    }
  }
  }

  export const crearRolNuevo=async (task)=>{
    try {
    const response= await axios.post(`${baseURL}rol/create/nuevo`, task)
    return response.data
  } catch (error) {
    if (error.response) {
      
      return { error: `Error del servidor`, data: error.response.data };
    }
  }
  }
export const listarPermiso=async ()=>{
  return await axios.get(`${baseURL}rol/permiso`)

}

  export const putDesactivarCliente = async (id_rol) => {
    return await axios.put(`${baseURL}rol/disable/${id_rol}`);
  }
  
  export const putActivarCliente = async (id_rol) => {
    return await axios.put(`${baseURL}rol/activate/${id_rol}`);
  }
  export const eliminar = async (id_rol) => {
    return await axios.delete(`${baseURL}rol/delete/${id_rol}`);
  }
  
  
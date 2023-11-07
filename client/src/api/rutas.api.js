import axios from 'axios'


 export const getListarUsuarios= async ()=>{
  return await axios.get('http://localhost:3001/usuario')
}

 export const crearUsuario= async (task)=>{
   return await axios.post('http://localhost:3001/usuario/create', task)  
}

export const cargaractualizarUsuario=async (id_usuario)=>{
  return await axios.get(`http://localhost:3001/usuario/${id_usuario}`)
}

export const actualizarUsuario=async (id_usuario, task)=>{
  return await axios.put(`http://localhost:3001/usuario/update/${id_usuario}`, task)
}

export const loginIngreso = async (email, contrasena) => {
  try {
    const response = await axios.post('http://localhost:3001/usuario/login/', {
      email: email,
      contrasena: contrasena,
    });
    return response.data; // Esto podría incluir el token u otros datos relevantes
  } catch (error) {
    throw error; // Maneja el error adecuadamente en tu componente React
  }
};
export const getListarRoles=async ()=>{
  return await axios.get('http://localhost:3001/rol')
}

export const crearRol=async (task)=>{
  return await axios.post(`http://localhost:3001/rol/create`, task)
}

export const putDesactivarCliente = async (id_usuario) => {
  return await axios.put(`http://localhost:3001/usuario/disable/${id_usuario}`);
}

export const putActivarCliente = async (id_usuario) => {
  return await axios.put(`http://localhost:3001/usuario/activate/${id_usuario}`);
}

export const eliminar = async (id_usuario) => {
  return await axios.delete(`http://localhost:3001/usuario/delete/${id_usuario}`);
}

export const verifyToken = async()=>{
  return await axios.get('http://localhost:3001/usuario/verefy/')
}




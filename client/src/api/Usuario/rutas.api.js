import axios from 'axios'

const baseURL = import.meta.env.VITE_REACT_API_URL;

 export const getListarUsuarios= async ()=>{
  return await axios.get(`${baseURL}usuario`)
}

export const enviarUsuario = async (task) => {
  try {
    const response = await axios.post(`${baseURL}usuario/create`, task);
    return response.data; // Devuelve los datos exitosos
  } catch (error) {
    if (error.response) {
      
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
}


export const cargaractualizarUsuario=async (id_usuario)=>{
  return await axios.get(`${baseURL}usuario/${id_usuario}`)
}

export const actualizarUsuario=async (id_usuario, task)=>{
  try{
 const response=await axios.put(`${baseURL}usuario/update/${id_usuario}`, task);
 return response.data; // Devuelve los datos exitosos
}catch (error) {
    if (error.response) {
      
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
};

export const loginIngreso = async (email, contrasena) => {
  try {
    const response = await axios.post(`${baseURL}usuario/login/`, {
      email: email,
      contrasena: contrasena,
    });
    const { token, user } = response.data; // Asumiendo que la respuesta incluye tanto el token como la información del usuario
    return { token, user }; // Esto podría incluir el token u otros datos relevantes
  } catch (error) {
    throw error; // Maneja el error adecuadamente en tu componente React
  }
};

export const cambiarContrasena = async (email, contrasena) => {
  try {
    const response = await axios.post(`${baseURL}usuario/cambiarcontrasena/`, {
      email: email,
      contrasena: contrasena,
    });
    console.log(`Contraseña cambiada exitosamente:`, response.data);

    return response.data; // O algo similar

  } catch (error) {
    throw error; // Maneja el error adecuadamente en tu componente React
  }
};

export const enviarContrasena = async (email) => {
  try {
    const response = await axios.post(`${baseURL}usuario/enviaremail/`, {
      email: email,
      
    });
  } catch (error) {
    throw error; // Maneja el error adecuadamente en tu componente React
  }
};
export const putDesactivarCliente = async (id_usuario) => {
  return await axios.put(`${baseURL}usuario/disable/${id_usuario}`);
}

export const putActivarCliente = async (id_usuario) => {
  return await axios.put(`${baseURL}usuario/activate/${id_usuario}`);
}

export const eliminar = async (id_usuario) => {
  return await axios.delete(`${baseURL}usuario/delete/${id_usuario}`);
}

export const verifyToken = async()=>{
  return await axios.get(`${baseURL}usuario/verefy/`)
}



export const getListarRoles=async ()=>{
  return await axios.get(`${baseURL}rol/rolesnuevo`)
}




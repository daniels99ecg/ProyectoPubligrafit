import axios from 'axios'

const baseURL = import.meta.env.VITE_REACT_API_URL;


export const  postCreateInsumo=async (taks)=>{
    try {
    const response=await axios.post(`${baseURL}insumo/create`,taks)
    return response.data; // Devuelve los datos exitosos
} catch (error) {
    if (error.response) {
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
}


export const  getListarInsumos=async ()=>{
    return await axios.get(`${baseURL}insumo`)
}

export const  getListarInsumo=async (id_isumo)=>{
    return await axios.get(`${baseURL}insumo/${id_isumo}`)
}


export const  getListarcategoria=async ()=>{
  return await axios.get(`${baseURL}insumo/categoria`)
}



export const  putActualizarInsumos=async (id_isumo, taks)=>{
    try {
    const response= await axios.put(`${baseURL}insumo/update/${id_isumo}`,taks)
    return response.data;
} catch (error) {
    if (error.response) {
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
}

export const eliminarInsumo= async (id_insumo) => {
    return await axios.delete(`${baseURL}insumo/delete/${id_insumo}`);
}

export const putDesactivarInsumo = async (id_insumo) => {
    return await axios.put(`${baseURL}insumo/disable/${id_insumo}`);
}

export const putActivarInsumo = async (id_insumo) => {
    return await axios.put(`${baseURL}insumo/activate/${id_insumo}`);
}
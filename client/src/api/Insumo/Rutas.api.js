import axios from 'axios'



export const  postCreateInsumo=async (taks)=>{
    try {
    const response=await axios.post('https://danielg99.alwaysdata.net/insumo/create',taks)
    return response.data; // Devuelve los datos exitosos
} catch (error) {
    if (error.response) {
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
}


export const  getListarInsumos=async ()=>{
    return await axios.get('https://danielg99.alwaysdata.net/insumo')
}

export const  getListarInsumo=async (id_isumo)=>{
    return await axios.get(`https://danielg99.alwaysdata.net/insumo/${id_isumo}`)
}

export const  putActualizarInsumos=async (id_isumo, taks)=>{
    try {
    const response= await axios.put(`https://danielg99.alwaysdata.net/insumo/update/${id_isumo}`,taks)
    return response.data;
} catch (error) {
    if (error.response) {
      return { error: 'Error del servidor', data: error.response.data };
    }
  }
}

export const eliminarInsumo= async (id_insumo) => {
    return await axios.delete(`https://danielg99.alwaysdata.net/insumo/delete/${id_insumo}`);
}

export const putDesactivarInsumo = async (id_insumo) => {
    return await axios.put(`https://danielg99.alwaysdata.net/insumo/disable/${id_insumo}`);
}

export const putActivarInsumo = async (id_insumo) => {
    return await axios.put(`https://danielg99.alwaysdata.net/insumo/activate/${id_insumo}`);
}
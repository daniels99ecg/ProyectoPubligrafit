import axios from 'axios'



export const  postCreateInsumo=async (taks)=>{
    return await axios.post('http://localhost:3001/insumo/create',taks)
}


export const  getListarInsumos=async ()=>{
    return await axios.get('http://localhost:3001/insumo')
}

export const  getListarInsumo=async (id_isumo)=>{
    return await axios.get(`http://localhost:3001/insumo/${id_isumo}`)
}

export const  putActualizarInsumos=async (id_isumo, taks)=>{
    return await axios.put(`http://localhost:3001/insumo/update/${id_isumo}`,taks)
}

export const eliminarInsumo= async (id_insumo) => {
    return await axios.delete(`http://localhost:3001/insumo/delete/${id_insumo}`);
}

export const putDesactivarInsumo = async (id_insumo) => {
    return await axios.put(`http://localhost:3001/insumo/disable/${id_insumo}`);
}

export const putActivarInsumo = async (id_insumo) => {
    return await axios.put(`http://localhost:3001/insumo/activate/${id_insumo}`);
}
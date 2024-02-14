import axios from 'axios'


export const  postCreateFichaTecnica=async (taks)=>{
    return await axios.post('http://localhost:3001/fichaTecnica/create',taks,{
    headers:{'Content-Type':'multipart/form-data',
    },
})
}
export const  getListarFichasTecnicas=async ()=>{
    return await axios.get('http://localhost:3001/fichaTecnica')
}

export const  getListarFichaTecnica=async (id_ft)=>{
    return await axios.get(`http://localhost:3001/fichaTecnica/fichaOne/${id_ft}`)
}

export const  putActualizarFichasTecnicas=async (id_ft, taks)=>{
    return await axios.put(`http://localhost:3001/fichaTecnica/update/${id_ft}`,taks)
}

export const eliminarFichaTecnica= async (id_ft) => {
    return await axios.delete(`http://localhost:3001/fichaTecnica/delete/${id_ft}`);
}

export const putDesactivarFichaTecnica = async (id_ft) => {
    return await axios.put(`http://localhost:3001/fichaTecnica/disable/${id_ft}`);
}

export const putActivarFichaTecnica = async (id_ft) => {
    return await axios.put(`http://localhost:3001/fichaTecnica/activate/${id_ft}`);
}
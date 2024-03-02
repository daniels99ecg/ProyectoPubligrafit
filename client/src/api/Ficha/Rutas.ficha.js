import axios from 'axios'

export const postCreateFichaTecnica = async (taks) => {
    try {
        const response = await axios.post('https://danielg99.alwaysdata.net/fichaTecnica/create', taks, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error; // Lanza el error nuevamente para ser capturado donde se llame a esta función
    }
};

export const  getListarFichasTecnicas=async ()=>{
    return await axios.get('https://danielg99.alwaysdata.net/fichaTecnica')
}

export const  getListarFichaTecnica=async (id_ft)=>{
    return await axios.get(`https://danielg99.alwaysdata.net/fichaTecnica/fichaOne/${id_ft}`)
}

export const  putActualizarFichasTecnicas=async (id_ft, taks)=>{
    return await axios.put(`https://danielg99.alwaysdata.net/fichaTecnica/update/${id_ft}`,taks)
}

export const eliminarFichaTecnica= async (id_ft) => {
    return await axios.delete(`https://danielg99.alwaysdata.net/fichaTecnica/delete/${id_ft}`);
}

export const putDesactivarFichaTecnica = async (id_ft) => {
    return await axios.put(`https://danielg99.alwaysdata.net/fichaTecnica/disable/${id_ft}`);
}

export const putActivarFichaTecnica = async (id_ft) => {
    return await axios.put(`https://danielg99.alwaysdata.net/fichaTecnica/activate/${id_ft}`);
}
import axios from 'axios'

const baseURL = import.meta.env.VITE_REACT_API_URL;


export const postCreateFichaTecnica = async (taks) => {
    try {
        const response = await axios.post(`${baseURL}fichaTecnica/create`, taks, {
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
    return await axios.get(`${baseURL}fichaTecnica`)
}

export const  getListarFichasTecnicasRealizada=async ()=>{
    return await axios.get(`${baseURL}fichaTecnica/realizada`)
}

export const  getListarFichaTecnica=async (id_ft)=>{
    return await axios.get(`${baseURL}fichaTecnica/fichaOne/${id_ft}`)
}

export const  putActualizarFichasTecnicas=async (id_ft, taks)=>{
    return await axios.put(`${baseURL}fichaTecnica/update/${id_ft}`,taks)
}

export const eliminarFichaTecnica= async (id_ft) => {
    return await axios.delete(`${baseURL}fichaTecnica/delete/${id_ft}`);
}

export const putDesactivarFichaTecnica = async (id_ft) => {
    return await axios.put(`${baseURL}fichaTecnica/disable/${id_ft}`);
}

export const putActivarFichaTecnica = async (id_ft) => {
    return await axios.put(`${baseURL}fichaTecnica/activate/${id_ft}`);
}

export const putOperacion = async (id_ft, operacion) => {
    try {
        const response = axios.put(`${baseURL}fichaTecnica/operacion/${id_ft}`,{
             operacion: operacion
        });
        return response.data; // O algo similar
      } catch (error) {
        throw error; // Maneja el error adecuadamente en tu componente React
      }
}

export const getListarOrdendelDia = async () => {
    return await axios.get(`${baseURL}fichaTecnica/ordendia`) 
    
  };

  export const getListarOrdenDia = async () => {
    return await axios.get(`${baseURL}fichaTecnica/ordendeldia`) 
    
  };

  export const getListarOrdenMes = async () => {
    return await axios.get(`${baseURL}fichaTecnica/ordenmes`) 
    
  };
  
  
  export const getListarOrdendelDiasemana = async () => {
    return await axios.get(`${baseURL}fichaTecnica/ordensemana`) 
    
  };


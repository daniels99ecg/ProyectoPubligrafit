import axios from `axios`

const baseURL = import.meta.env.VITE_REACT_API_URL;


export const getListarClientes = async () => {
    return await axios.get(`${baseURL}cliente`) // route of server
}

export const postCrearClientes = async (task) => {
    return await axios.post(`${baseURL}cliente/create`, task) // route and controller
}

export const showClienteUpdate = async (documento) => {
    return await axios.get(`${baseURL}cliente/${documento}`)
}

export const putActualizarCliente = async (documento, task) => {
    return await axios.put(`${baseURL}cliente/update/${documento}`, task)
}

export const deleteCliente = async (documento) => {
    return await axios.delete(`${baseURL}cliente/delete/${documento}`);
}

export const putDesactivarCliente = async (documento) => {
    return await axios.put(`${baseURL}cliente/disable/${documento}`);
}

export const putActivarCliente = async (documento) => {
    return await axios.put(`${baseURL}cliente/activate/${documento}`);
}
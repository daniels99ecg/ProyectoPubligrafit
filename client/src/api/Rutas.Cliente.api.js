import axios from 'axios'

const baseURL = import.meta.env.VITE_REACT_API_URL;

export const getListarClientes = async () => {
    return await axios.get(`${baseURL}cliente`) // route of server
}

export const postCrearClientes = async (task) => {
    return await axios.post(`${baseURL}cliente/create`, task) // route and controller
}

export const showClienteUpdate = async (id_cliente) => {
    return await axios.get(`${baseURL}cliente/${id_cliente}`)
}

export const putActualizarCliente = async (id_cliente, task) => {
    return await axios.put(`${baseURL}cliente/update/${id_cliente}`, task)
}

export const deleteCliente = async (id_cliente) => {
    return await axios.delete(`${baseURL}cliente/delete/${id_cliente}`);
}

export const putDesactivarCliente = async (id_cliente) => {
    return await axios.put(`${baseURL}cliente/disable/${id_cliente}`);
}

export const putActivarCliente = async (id_cliente) => {
    return await axios.put(`${baseURL}cliente/activate/${id_cliente}`);
}

export const getClienteExistente = async (documento) => {
    return await axios.get(`${baseURL}cliente/existente/${documento}`);
}
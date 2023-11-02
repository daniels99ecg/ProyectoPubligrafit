import axios from 'axios'

export const getListarClientes = async () => {
    return await axios.get('http://localhost:3001/cliente') // route of server
}

export const postCrearClientes = async (task) => {
    return await axios.post('http://localhost:3001/cliente/create', task) // route and controller
}

export const showClienteUpdate = async (documento) => {
    return await axios.get(`http://localhost:3001/cliente/${documento}`)
}

export const putActualizarCliente = async (documento, task) => {
    return await axios.put(`http://localhost:3001/cliente/update/${documento}`, task)
}

export const deleteCliente = async (documento) => {
    return await axios.delete(`http://localhost:3001/cliente/delete/${documento}`);
}

export const putDesactivarCliente = async (documento) => {
    return await axios.put(`http://localhost:3001/cliente/disable/${documento}`);
}

export const putActivarCliente = async (documento) => {
    return await axios.put(`http://localhost:3001/cliente/activate/${documento}`);
}
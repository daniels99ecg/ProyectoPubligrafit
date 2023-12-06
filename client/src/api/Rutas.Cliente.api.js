import axios from 'axios'

export const getListarClientes = async () => {
    return await axios.get('http://localhost:3001/cliente') // route of server
}

export const postCrearClientes = async (task) => {
    return await axios.post('http://localhost:3001/cliente/create', task) // route and controller
}

export const showClienteUpdate = async (id_cliente) => {
    return await axios.get(`http://localhost:3001/cliente/${id_cliente}`)
}

export const putActualizarCliente = async (id_cliente, task) => {
    return await axios.put(`http://localhost:3001/cliente/update/${id_cliente}`, task)
}

export const deleteCliente = async (id_cliente) => {
    return await axios.delete(`http://localhost:3001/cliente/delete/${id_cliente}`);
}

export const putDesactivarCliente = async (id_cliente) => {
    return await axios.put(`http://localhost:3001/cliente/disable/${id_cliente}`);
}

export const putActivarCliente = async (id_cliente) => {
    return await axios.put(`http://localhost:3001/cliente/activate/${id_cliente}`);
}

export const getClienteExistente = async (documento) => {
    return await axios.get(`http://localhost:3001/cliente/existente/${documento}`);
}
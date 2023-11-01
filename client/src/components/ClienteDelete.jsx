import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCliente } from '../api/Rutas.Cliente.api';
import Nav from '../components/nav'
import Swal from 'sweetalert2';

function DeleteCliente() {
    const navigate = useNavigate();
    const [clienteId, setClienteId] = useState(""); // Estado para almacenar el ID del cliente a eliminar

    const eliminarCliente = async () => {
        try {
            const response = await deleteCliente(clienteId);

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente eliminado con éxito',
                });
                navigate("/cliente"); 
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar el cliente',
                    text: 'No se pudo eliminar al cliente. Por favor, inténtalo de nuevo.',
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page-flex">
            <div className="main-wrapper">
                <br />
                <div className='card w-75 p-3 mx-auto mt-5'>
                    <h2>Eliminar Cliente</h2>
                    <div className="form-group">
                        <label htmlFor="clienteId">ID del Cliente a Eliminar:</label>
                        <input
                            type="text"
                            name='clienteId'
                            value={clienteId}
                            onChange={(e) => setClienteId(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className='col-auto'>
                        <button className='btn btn-danger' onClick={() => eliminarCliente()}>Eliminar Cliente</button>
                    </div>
                    <div className='col-auto'>
                        <button className='btn btn-secondary' onClick={() => navigate("/cliente")}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteCliente;

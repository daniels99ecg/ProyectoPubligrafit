import { useEffect, useState } from "react"
import { getListarRoles, putActivarCliente,putDesactivarCliente } from "../../api/rutas.api"
import Nav from '../../components/nav'
import { DataGrid } from '@mui/x-data-grid';


function Rol(){
const [listar, setListar]=useState([])//Lista todos los roles
const [searchTerm, setSearchTerm] = useState(""); //Para hacer la busqueda por filtro 

    useEffect(()=>{
    async function cargarRol(){
       
           const response= await getListarRoles()//LLamar la ruta del server
           setListar(response.data) //Se le pasa los datos al setListar 
    }
    cargarRol()
    },[])

    const desactivarCliente = async (id_rol) => {
      try {
        const response = await putDesactivarCliente(id_rol);
        if (response.status === 200) {
          // Actualiza la lista de clientes después de desactivar uno
          const updatedList = listar.map((item) => {
            if (item.id_rol === id_rol) {
              // Actualiza el estado del cliente en la lista
              return { ...item, estado: false };
            }
            return item;
          });
          setListar(updatedList);
        }
      } catch (error) {
        console.error(error);
        // Maneja el error de manera adecuada
      }
    };
  
    const activarCliente = async (id_rol) => {
      try {
        const response = await putActivarCliente(id_rol);
        if (response.status === 200) {
          // Actualiza la lista de clientes después de activar uno
          const updatedList = listar.map((item) => {
            if (item.id_rol === id_rol) {
              // Actualiza el estado del cliente en la lista
              return { ...item, estado: true };
            }
            return item;
          });
          setListar(updatedList);
        }
      } catch (error) {
        console.error(error);
        // Maneja el error de manera adecuada
      }
    };


    return(
      <>
      <Nav/>
          <div className='dashboard-app'>
              <div className='dashboard-content'>
                  <div className='container'>
                      <div className='card'>
                          {/* <div class='card-header'>
                              <h1>Welcome back Jim</h1>
                          </div> */}
                          <div className='card-body'>
                          <br />
   
    <div className='row'>
    <div className="col-md-2">  
    <a className="btn btn-primary " href="/rol/create" role="button">Nuevo Registro</a>
    </div>
    <div className="col-md-3">
    <input
                  type="text"
                  placeholder="Buscar..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
                </div>
                </div>
    <br />
    
        <div className="card" style={{marginLeft:15}}>


        <DataGrid
            rows={listar.map((item) => ({
              ...item,
              id: item.id_rol,
             
            }))}
            columns={[
              { field: 'id_rol', headerName: 'Id', flex: 0 },
              { field: 'nombre_rol', headerName: 'Nombre', flex: 0.5 },
              { field: 'fecha', headerName: 'Fecha', flex: 0.5 },
         
              {
                field: 'estado',
                headerName: 'Estado',
                flex: 0.5,
                renderCell: (params) => (
                  <div className="switch-button">
                     <input
                       type="checkbox"
                        id={`switch-label-${params.row.id_rol}`}
                        checked={params.row.estado}
                        onChange={(e) => {
                        e.preventDefault(); // Evitar la navegación por defecto
                    if (params.row.estado) {
                      desactivarCliente(params.row.id_rol);
                  } else {
                      activarCliente(params.row.id_rol);
                }
          }}
        className="switch-button__checkbox"
      />
      <label
        htmlFor={`switch-label-${params.row.id_rol}`}
        className="switch-button__label"
      ></label>
                  </div>
                ),
              }
            ]}
            autoHeight
            
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100,
                },
              },
            }}
          />
  


</div>

                    </div>
                </div>
            </div>
        </div>
  </div>
    </>

    )
}

export default Rol
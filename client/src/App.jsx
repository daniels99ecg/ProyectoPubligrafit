


import { Route, Routes } from 'react-router-dom'
import User from './page/Usuario/usuario'
import UserCreate from './page/Usuario/usuarioCreate'
import UserUpdate from './page/Usuario/usuarioUpdate'

import { UserContextProvider } from './context/Usuario/UserContext'
import { RolContextProvider } from './context/Rol/RolContext'
import ProtectedRoute from './ProtectedRoute';
import Rol from './page/Rol/Rol'
import RolCreate from './page/Rol/RolCreate'
import Login from './page/Login/login'
import Recuperar from './page/Login/recuperaContraseña'
import Enviaremail from './page/Login/enviaremail'
import Dashboard from './page/Dashboard/dashboard'
import Profile from './page/Perfil/perfil';
import UpdateRol from './page/Rol/UpdateRol'


import ShowProducto from './page/Producto/Productos'
import ShowFichasTecnicas from './page/FichaTecnica/FichasTecnicas'
import ShowInsumos from './page/Insumo/Insumos'
import CreateInsumos from './page/Insumo/CreateInsumos'
import CreateProductos from './page/Producto/CreateProductos'
import CreateFichasTecnicas from './page/FichaTecnica/CreateFichasTecnicas'
import UpdateInsumo from './page/Insumo/UpdateInsumo'
import UpdateProducto from './page/Producto/UpdateProducto'
import UpdateFichaTecnica from './page/FichaTecnica/UpdateFichaTecnica'
import {InsumoContextProvider} from './context/Insumos/InsumoContext'
import { ProductoContextProvider } from './context/Productos/ProductoContext'
import { FichaTecnicaContextProvider } from './context/FichasTecnicas/FichaTecnicaContext'


import Compras from './page/Compras/Compras'
import ComprasCreate from './page/Compras/ComprasCreate'
import { CompraContextProvider } from './context/Compras/ComprasContext'

import ShowCliente from './page/Cliente/Cliente'
import { ClienteContextProvider } from './context/Clientes/ClienteContext'
import { VentaContextProvider } from './context/Ventas/VentaContext'
import ShowVenta from './page/Venta/Venta'


function NotFound() {
  return <div className='text-center'>404 Pagina No Disponible</div>;
}

function App() {

  return (
    <>
  
    <VentaContextProvider>

        <CompraContextProvider>
      <InsumoContextProvider>
     <ProductoContextProvider>
      <FichaTecnicaContextProvider>
<ClienteContextProvider>
    <UserContextProvider>
     <RolContextProvider>
     <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path='/cambiarcontrasena' element={<Recuperar/>}/>
     <Route path='/enviaremail' element={<Enviaremail/>}/>

     <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      {/* Usuarios */}
      
      <Route path='/usuario' element={<ProtectedRoute element={<User/>}/> } />
      <Route path='/usuario/create' element={<ProtectedRoute element={<UserCreate/>}/> } />
      <Route path='/editu/:id_usuario' element={<ProtectedRoute element={<UserUpdate/>}/> } />

      {/* Rol */}
      <Route path='/rol' element={<ProtectedRoute element={<Rol/>}/> } />
      <Route path='/rol/create' element={<ProtectedRoute element={<RolCreate/>}/> } />
      <Route path='/editr/:id_rol' element={<ProtectedRoute element={<UpdateRol/>}/> } />

      {/*Perfil*/}
      <Route path='profile' element={<ProtectedRoute element={<Profile />}/>}/>

      {/* Cliente */}

      <Route path='/cliente' element={<ShowCliente/>}/>
      <Route path='/venta' element={<ShowVenta/>}/>

      <Route path='/producto' element={<ProtectedRoute element={<ShowProducto />}/>} />
      <Route path='/fichaTecnica' element={<ProtectedRoute element={<ShowFichasTecnicas />}/>} />
      <Route path='/insumo' element={<ProtectedRoute element={<ShowInsumos />}/>} />
      <Route path='/insumo/create' element={<ProtectedRoute element={<CreateInsumos />}/>} />
      <Route path='/producto/create' element={<ProtectedRoute element={<CreateProductos />}/>} />
      <Route path='/fichaTecnica/create' element={<ProtectedRoute element={<CreateFichasTecnicas />}/>} />
      <Route path='/editF/:id_ft' element={<ProtectedRoute element={<UpdateFichaTecnica />}/>} />
      <Route path='/editI/:id_insumo' element={<ProtectedRoute element={<UpdateInsumo />}/>} />
      <Route path='/editP/:id_producto' element={<ProtectedRoute element={<UpdateProducto />}/>} />

      <Route path='/compras' element={<ProtectedRoute element={<Compras />}/>} />
      <Route path='/compras/create' element={<ProtectedRoute element={<ComprasCreate />}/>} />
    
      <Route path='*' element={<NotFound />} />

     </Routes>
     </RolContextProvider> 
     </UserContextProvider>
     </ClienteContextProvider>
     
      </FichaTecnicaContextProvider>
    </ProductoContextProvider>
    </InsumoContextProvider>
    </CompraContextProvider>
    </VentaContextProvider>

    
    </>
  )
}

export default App
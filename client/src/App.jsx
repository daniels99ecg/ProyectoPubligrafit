
import { Route, Routes } from 'react-router-dom'
import User from './page/Usuario/usuario'

import { UserContextProvider } from './context/Usuario/UserContext'
import { RolContextProvider } from './context/Rol/RolContext'
import ProtectedRoute from './ProtectedRoute';
import Rol from './page/Rol/Rol'

import Login from './page/Login/login'
import Recuperar from './page/Login/recuperaContraseña'
import Enviaremail from './page/Login/enviaremail'
import Dashboard from './page/Dashboard/dashboard'
import Profile from './page/Perfil/perfil';

import ShowProducto from './page/Producto/Productos'
import ShowFichasTecnicas from './page/FichaTecnica/FichasTecnicas'
import ShowInsumos from './page/Insumo/Insumos'
import CreateProductos from './page/Producto/CreateProductos'
import CreateFichasTecnicas from './page/FichaTecnica/FichaCreatePruebas'
import UpdateInsumo from './page/Insumo/UpdateInsumo'
import UpdateProducto from './page/Producto/UpdateProducto'
import UpdateFichaTecnica from './page/FichaTecnica/UpdateFichaTecnica'
import {InsumoContextProvider} from './context/Insumos/InsumoContext'
import { ProductoContextProvider } from './context/Productos/ProductoContext'
import { FichaTecnicaContextProvider } from './context/FichasTecnicas/FichaTecnicaContext'

import Compras from './page/Compras/Compras'
import { CompraContextProvider } from './context/Compras/ComprasContext'

import ShowCliente from './page/Cliente/Cliente'
import { ClienteContextProvider } from './context/Clientes/ClienteContext'
import { VentaContextProvider } from './context/Ventas/VentaContext'
import { ProveedorContextProvider } from './context/Proveedor/ProveedorContext'
import ShowVenta from './page/Venta/Venta'

function NotFound() {
  return <div className='text-center'>404 Pagina No Disponible</div>;
}

function App() {

  return (
    <>
     <ProveedorContextProvider>
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
     

      {/* Rol */}
      <Route path='/rol' element={<ProtectedRoute element={<Rol/>}/> } />
 

      {/*Perfil*/}
      <Route path='profile' element={<ProtectedRoute element={<Profile />}/>}/>

      {/* Cliente */}

      <Route path='/cliente' element={<ShowCliente/>}/>
      <Route path='/venta' element={<ShowVenta/>}/>

      <Route path='/producto' element={<ProtectedRoute element={<ShowProducto />}/>} />
      <Route path='/fichaTecnica' element={<ProtectedRoute element={<ShowFichasTecnicas />}/>} />
      <Route path='/insumo' element={<ProtectedRoute element={<ShowInsumos />}/>} />
      <Route path='/producto/create' element={<ProtectedRoute element={<CreateProductos />}/>} />
      <Route path='/fichaTecnica/create' element={<ProtectedRoute element={<CreateFichasTecnicas />}/>} />
      <Route path='/editF/:id_ft' element={<ProtectedRoute element={<UpdateFichaTecnica />}/>} />
      <Route path='/editI/:id_insumo' element={<ProtectedRoute element={<UpdateInsumo />}/>} />
      <Route path='/editP/:id_producto' element={<ProtectedRoute element={<UpdateProducto />}/>} />

      <Route path='/compras' element={<ProtectedRoute element={<Compras />}/>} />
  
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
    </ProveedorContextProvider>
    
    </>
  )
}

export default App
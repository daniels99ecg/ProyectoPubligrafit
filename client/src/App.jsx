
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

import ShowFichasTecnicas from './page/FichaTecnica/FichasTecnicas'
import ShowInsumos from './page/Insumo/Insumos'

import {InsumoContextProvider} from './context/Insumos/InsumoContext'
import { ProductoContextProvider } from './context/Productos/ProductoContext'
import { FichaTecnicaContextProvider } from './context/FichasTecnicas/FichaTecnicaContext'

import Compras from './page/Compras/Compras'
import { CompraContextProvider } from './context/Compras/ComprasContext'

import ShowCliente from './page/Cliente/Cliente'
import { ClienteContextProvider } from './context/Clientes/ClienteContext'
import { VentaContextProvider } from './context/Ventas/VentaContext'
import { ProveedorContextProvider } from './context/Proveedor/ProveedorContext'
import ShowVenta from './page/Venta/VentaPruebas'

import Home_page from './page/Home_page/Home_page'



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
    path="/Home" element={<ProtectedRoute element={<Home_page />}/>
    }
  />

     <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} requiredPermissions={['Dashboard']}/>
    }
  />
      {/* Usuarios */}
      
      <Route 
      path='/usuario' element={<ProtectedRoute element={<User/>} requiredPermissions={['Usuario']}/>} />
     

      {/* Rol */}
      <Route path='/rol' element={<ProtectedRoute element={<Rol/>} requiredPermissions={['Rol']}/> } />
 

      {/*Perfil*/}
      <Route path='profile' element={<ProtectedRoute element={<Profile />}/>}/>

      {/* Cliente */}

      <Route path='/cliente' element={<ProtectedRoute element={<ShowCliente />} requiredPermissions={['Cliente']}/>}/>

      {/*Venta*/}

      <Route path='/venta' element={<ProtectedRoute element={<ShowVenta />} requiredPermissions={['Venta']}/>}/>

      {/*Producto*/}

      {/*Ficha Tecnica*/}

      <Route path='/ordenes' element={<ProtectedRoute element={<ShowFichasTecnicas />} requiredPermissions={['Ordenes']}/>} />

      {/*Insumo*/}

      <Route path='/insumo' element={<ProtectedRoute element={<ShowInsumos />} requiredPermissions={['Insumo']}/>} />


      {/*Compras*/}

      <Route path='/compras' element={<ProtectedRoute element={<Compras />} requiredPermissions={['Compra']}/>} />
  
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
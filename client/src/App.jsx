import ShowCliente from './page/Cliente/Cliente'
import CreateCliente from './page/Cliente/ClienteCreate'
import UpdateCliente from './page/Cliente/ClienteUpdate'
import { ClienteContextProvider } from './context/Clientes/ClienteContext'


import { Route, Routes } from 'react-router-dom'
import User from './page/Usuario/usuario'
import UserCreate from './page/Usuario/usuarioCreate'
import UserUpdate from './page/Usuario/usuarioUpdate'

import { UserContextProvider } from './context/Usuario/UserContext'
import { RolContextProvider } from './context/Rol/RolContext'
import Rol from './page/Rol/Rol'
import RolCreate from './page/Rol/RolCreate'
import Login from './page/Login/login'
import Dashboard from './page/Dashboard/dashboard'


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
function App() {

  return (
    <>
    <CompraContextProvider>
      <InsumoContextProvider>
     <ProductoContextProvider>
      <FichaTecnicaContextProvider>
<ClienteContextProvider>
    <UserContextProvider>
     <RolContextProvider>
     <Routes>
     <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      {/* Usuarios */}
      
      <Route path='/usuario' element={<User/>}/>
      <Route path='/usuario/create' element={<UserCreate/>}/>
      <Route path='/editu/:id_usuario' element={<UserUpdate/>}/>

      {/* Rol */}

      <Route path='/rol' element={<Rol/>}/>
      <Route path='/rol/create' element={<RolCreate/>}/>

      {/* Cliente */}

      <Route path='/cliente' element={<ShowCliente/>}/>
      <Route path='/cliente/create' element={<CreateCliente/>}/> 
      <Route path='/editc/:documento' element={<UpdateCliente/>}/> 


      <Route path='/producto' element={<ShowProducto/>}/>
      <Route path='/fichaTecnica' element={<ShowFichasTecnicas/>}/>
      <Route path='/insumo' element={<ShowInsumos/>}/>
      <Route path='/insumo/create' element={<CreateInsumos/>}/>
      <Route path='/producto/create' element={<CreateProductos/>}/>
      <Route path='/fichaTecnica/create' element={<CreateFichasTecnicas/>}/>
      <Route path='/editF/:id_ft' element={<UpdateFichaTecnica/>}/>
      <Route path='/editI/:id_insumo' element={<UpdateInsumo/>}/>
      <Route path='/editP/:id_producto' element={<UpdateProducto/>}/>
      <Route path='/compras' element={<Compras/>}/>
      <Route path='/compras/create' element={<ComprasCreate/>}/>

      
     </Routes>
     </RolContextProvider> 
     </UserContextProvider>
     </ClienteContextProvider>
     
      </FichaTecnicaContextProvider>
    </ProductoContextProvider>
    </InsumoContextProvider>
    </CompraContextProvider>
      

    
    </>
  )
}

export default App
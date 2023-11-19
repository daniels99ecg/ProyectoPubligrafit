import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './context/Usuario/UserContext';
import { RolContextProvider } from './context/Rol/RolContext';
import ProtectedRoute from './ProtectedRoute';

import User from './page/Usuario/usuario';
import UserCreate from './page/Usuario/usuarioCreate';
import UserUpdate from './page/Usuario/usuarioUpdate';
import Rol from './page/Rol/Rol';
import RolCreate from './page/Rol/RolCreate';
import Login from './page/Login/login';
import Dashboard from './page/Dashboard/dashboard';

function App() {

  return (
    <>
    <UserContextProvider>
     <RolContextProvider>
     <Routes>
     <Route path='/' element={<Login/>}/>
      {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      {/* Usuarios */}
      
      <Route path='/usuario' element={<ProtectedRoute element={<User/>}/> } />
      <Route path='/usuario/create' element={<ProtectedRoute element={<UserCreate/>}/> } />
      <Route path='/edit/:id_usuario' element={<ProtectedRoute element={<UserUpdate/>}/> } />

      {/* Rol */}
      <Route path='/rol' element={<ProtectedRoute element={<Rol/>}/> } />
      <Route path='/rol/create' element={<ProtectedRoute element={<RolCreate/>}/> } />

     </Routes>
     </RolContextProvider> 
     </UserContextProvider>
    </>
  )
}

export default App

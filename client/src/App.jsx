
import { Route, Routes } from 'react-router-dom'
import User from './components/usuario'
import UserCreate from './components/usuarioCreate'


function App() {

  return (
    <>
     <Routes>
      <Route path='/usuario' element={<User/>}/>
      <Route path='/usuario/create' element={<UserCreate/>}/>
      <Route path='/edit/:id' element={<UserCreate/>}/>

     </Routes>
    </>
  )
}

export default App

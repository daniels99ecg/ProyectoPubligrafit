import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Compras from './pages/Compras/Compras'
import ComprasCreate from './pages/Compras/ComprasCreate'

function App() {
  

  return (
    <> 
     <Routes>
      <Route path='/compras' element={<Compras/>}/> {/*Crear la ruta del listar*/}
      <Route path='/compras/create' element={<ComprasCreate/>}/> {/*Crear la luta del create*/}
     </Routes>
      
    </>
  )
}

export default App

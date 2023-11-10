import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Compras from './page/Compras/Compras'
import ComprasCreate from './page/Compras/ComprasCreate'
import { CompraContextProvider } from './context/Compras/ComprasContext'
function App() {
  

  return (
    <> 
    <CompraContextProvider>
     <Routes>
      <Route path='/compras' element={<Compras/>}/> {/*Crear la ruta del listar*/}
      <Route path='/compras/create' element={<ComprasCreate/>}/> {/*Crear la luta del create*/}
     </Routes>
     </CompraContextProvider>
    </>
  )
}

export default App

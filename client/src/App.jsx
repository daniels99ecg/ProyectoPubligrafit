import { Route, Routes } from 'react-router-dom'
import ShowProductos from './componentes/Productos'
import ShowFichasTecnicas from './componentes/Fichas_Tecnicas'
import ShowInsumos from './componentes/Insumos'
import CreateInsumos from './componentes/CreateInsumos'
import CreateProductos from './componentes/CreateProductos'
import CreateFichasTecnicas from './componentes/CreateFichasTecnicas'

function App() {

  return (
    <>
     <Routes>
      <Route path='/producto' element={<ShowProductos/>}/>
      <Route path='/fichaTecnica' element={<ShowFichasTecnicas/>}/>
      <Route path='/insumo' element={<ShowInsumos/>}/>
      <Route path='/insumo/create' element={<CreateInsumos/>}/>
      <Route path='/producto/create' element={<CreateProductos/>}/>
      <Route path='/fichaTecnica/create' element={<CreateFichasTecnicas/>}/>


      

     </Routes>
    </>
  )
}

export default App
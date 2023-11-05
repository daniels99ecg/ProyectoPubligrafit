import { Route, Routes } from 'react-router-dom'
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
 
function App() {

  return (
    <>
     <InsumoContextProvider>
     <ProductoContextProvider>
      <FichaTecnicaContextProvider>
      <Routes>
      <Route path='/producto' element={<ShowProducto/>}/>
      <Route path='/fichaTecnica' element={<ShowFichasTecnicas/>}/>
      <Route path='/insumo' element={<ShowInsumos/>}/>
      <Route path='/insumo/create' element={<CreateInsumos/>}/>
      <Route path='/producto/create' element={<CreateProductos/>}/>
      <Route path='/fichaTecnica/create' element={<CreateFichasTecnicas/>}/>
      <Route path='/editF/:id_ft' element={<UpdateFichaTecnica/>}/>
      <Route path='/editI/:id_insumo' element={<UpdateInsumo/>}/>
      <Route path='/editP/:id_producto' element={<UpdateProducto/>}/>
      </Routes>
      </FichaTecnicaContextProvider>
    </ProductoContextProvider>
    </InsumoContextProvider>

      

    
    </>
  )
}

export default App
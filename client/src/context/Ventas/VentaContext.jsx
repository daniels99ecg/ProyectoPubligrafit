import {createContext, useContext, useState} from 'react'
import { getListarVentas, postCreateVentas,getListarVentasDia } from "../../api/Rutas.Venta.api";
export const VentaContext=createContext()

export const useVenta = () => {
    const context = useContext(VentaContext)
    if (!context){
        throw new error("useVenta debe estar en provider")
    }
    return context
}

export const VentaContextProvider=({children})=>{
    const [listar, setListar] = useState([])
    const [listar2, setListar2] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

async function showVentas(){
    try {
        const response=await getListarVentas() 
        
        const filterList = response.data.filter((item) => 
          item.id_venta.toString().includes(searchTerm) || 
          item.fk_id_cliente.toString().includes(searchTerm) ||
          item.tipo_comprobante.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.fecha.includes(searchTerm) ||
        //   new Date(item.fecha).toLocaleDateString().includes(searchTerm) ||
          item.total.toString().includes(searchTerm)
                
        );
        setListar(filterList)
    } catch (error) {
        console.log(error);
    }
}
  
const validarVenta = async(values)=>{
    try {
        await postCreateVentas(values)
        showVentas()
    } catch (error) {
        console.log(error)
    }
}
const VentaDia = async(values)=>{
    try {
        
    const response =  await getListarVentasDia(values)
      setListar2(response.data)
    } catch (error) {
        console.log(error)
    }
}


return(
    <VentaContext.Provider value={{listar, setListar, listar2,showVentas, searchTerm, setSearchTerm, validarVenta,VentaDia}}> 
        {children}
    </VentaContext.Provider>
)

}
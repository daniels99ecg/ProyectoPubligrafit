import {createContext, useContext, useState} from 'react'
import {getListarProveedor} from "../../api/Proveedor/Rutas.Proveedor.api"

export const ProveedorContext=createContext()

export const useProveedor = () => {
    const context = useContext(ProveedorContext)
    if (!context){
        throw new error("useProveedor debe estar en provider")
    }
    return context
}

export const ProveedorContextProvider=({children})=>{
    const [listarP, setListarP] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    async function showProveedor(){
        try {
            const response=await getListarProveedor() 
            
            const filterList = response.data.filter((item) => 
              item.id_proveedores.toString().includes(searchTerm)
                    
            );
            setListarP(filterList)
        } catch (error) {
            console.log(error);
        }
    }



return(
    <ProveedorContext.Provider value={{listarP, setListarP,showProveedor,searchTerm,setSearchTerm}}> 
        {children}
    </ProveedorContext.Provider>
)

}
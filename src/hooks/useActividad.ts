import { useContext } from "react"
import { ActividadContext } from "../contexts/ActividadContext"


export const useActividad = () => {

    const context = useContext(ActividadContext)

    return context
}
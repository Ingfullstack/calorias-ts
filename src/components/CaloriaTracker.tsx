import { useMemo } from "react"
import { Actividades } from "../types"
import CaloriaDisplay from "./CaloriaDisplay"

type Props = {
    state: Actividades[]
}

export default function CaloriaTracker({ state }: Props) {

    const caloriaConsumida = useMemo(() => state.reduce((total,item) => item.categoria === 1 ? total + item.caloria : total , 0) ,[state])
    const caloriaQuemada = useMemo(() => state.reduce((total,item) => item.categoria === 2 ? total + item.caloria : total, 0) ,[state])
    const caloriaTotales = useMemo(() => {
        return caloriaConsumida - caloriaQuemada
    },[state])

  return (
    
    <>
        <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
        <div className="flex flex-col  md:flex-row md:justify-between md:items-center gap-5 mt-10">
            <CaloriaDisplay calorias={ caloriaConsumida } text="Consumida"/>
            <CaloriaDisplay calorias={ caloriaQuemada } text="Ejercicios"/>
            <CaloriaDisplay calorias={ caloriaTotales } text="Diferencias"/>
        </div>
    </>
  )
}

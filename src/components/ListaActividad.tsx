import { useMemo } from "react"
import { Actividades } from "../types"
import { Categorias } from "../data/db"
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { useActividad } from "../hooks/useActividad"

export default function ListaActividad() {

    const { state, dispatch } = useActividad();

    const nombreCaategoria = useMemo(() => (cat:Actividades['categoria']) => {
        return Categorias.map((item) => {
            if (item.id === cat) {
                return item.name
            }
            return
        })
    }, [state])

  return (
    <>
        { state.actividad.length === 0 ? (
            <h2 className="text-3xl md:text-4xl font-bold text-slate-600 text-center mb-10">No Hay Actividades</h2>

        ): (
            <>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-600 text-center mb-10">Comidas y Actividades</h2>
            { state.actividad.map((item) => (
            <div key={ item.id } className="py-10 bg-white px-5 shadow-md rounded-md mb-5 flex justify-between items-center">
                <div className="relative space-y-3">
                    <p className={`absolute -top-14 -left-6 px-10 text-white uppercase font-bold py-2 ${ item.categoria === 1 ? 'bg-lime-500': 'bg-orange-500'}`}>{ nombreCaategoria(+item.categoria) }</p>
                    <p className="text-2xl font-bold mt-5">{ item.actividad }</p>
                    <p className="font-black text-4xl text-lime-500">
                        { item.caloria } {''}
                        <span>Calorias</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button onClick={ () => dispatch({ type: "activeId", payload: { id: item.id }})}>
                        <PencilSquareIcon className="w-8 h-8 text-slate-600"/>
                    </button>

                    <button onClick={ () => dispatch({ type: "remover", payload: { id: item.id}})}>
                        <XCircleIcon className="w-8 h-8 text-red-600"/>
                    </button>
                </div>
            </div>
        ))}
            </>
        )}
    </>
  )
}

import { ChangeEvent, useEffect, useState } from "react";
import { Categorias } from "../data/db";
import { Actividades } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { useActividad } from "../hooks/useActividad";

export default function Formulario() {

  const { dispatch, state } = useActividad();

  const inicial = {
    id: uuidv4(),
    categoria: 1,
    actividad: "",
    caloria: 0,
  }

  const [actividades, setActividades] = useState<Actividades>(inicial);

  useEffect(() => {

    const existe = state.actividad.find((item) => item.id === state.activeId);
    if (existe) {
      setActividades(existe)
    }

  },[state.activeId])

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumber = ["categoria", "caloria"].includes(e.target.id);

    setActividades({
      ...actividades,
      [e.target.id]: isNumber ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    dispatch({ type: 'agregar-actividad', payload: { actividad: actividades }});
    setActividades({
      ...inicial,
      id: uuidv4()
    });
  }

  const isValid = () => {
    const { actividad, caloria } = actividades;
    return actividad.trim() !== "" && caloria > 0;
  };

  return (
    <form onSubmit={ handleSubmit } className="bg-white px-5 py-10 rounded-md">
      <div className="mb-3">
        <label htmlFor="categoria" className="font-bold">
          Categoria
        </label>
        <select
          name="categoria"
          id="categoria"
          className="rounded-md border border-slate-300 p-2 w-full mt-2"
          value={actividades.categoria}
          onChange={handleChange}
        >
          <option disabled value="">Seleccione una Categoria</option>
          {Categorias.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="actividad" className="font-bold">
          Actividad
        </label>
        <input
          type="text"
          id="actividad"
          name="actividad"
          className="rounded-md border border-slate-300 p-2 w-full mt-2"
          placeholder="Ej. Comida, Jugo, Pesas"
          value={actividades.actividad}
          onChange={handleChange}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="caloria" className="font-bold">
          Caloria
        </label>
        <input
          type="number"
          id="caloria"
          name="caloria"
          className="rounded-md border border-slate-300 p-2 w-full mt-2"
          placeholder="Ej. 300 o 500"
          value={actividades.caloria}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="disabled:opacity-20 bg-gray-800 hover:bg-gray-900 transition-all duration-300 w-full p-2 uppercase text-white font-bold cursor-pointer rounded-md"
        value={
          actividades.categoria === 1 ? "Guardar Comida" : "Guardar Ejercicios"
        }
        disabled={!isValid()}
      />
    </form>
  );
}

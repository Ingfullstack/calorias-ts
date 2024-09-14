import { useEffect, useMemo, useReducer } from "react";
import Formulario from "./components/Formulario";
import { ActividadReducer, initialState } from "./hooks/actividadReducer";
import ListaActividad from "./components/ListaActividad";
import CaloriaTracker from "./components/CaloriaTracker";

function App() {
  const [state, dispatch] = useReducer(ActividadReducer, initialState);

  const resetear = useMemo(() => state.actividad.length > 0, [state.actividad]);

  useEffect(() => {
    localStorage.setItem("actividad", JSON.stringify(state.actividad));
  }, [state.actividad]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto text-center space-y-3 md:flex md:justify-between md:items-center md:space-y-0">
          <h1 className="text-2xl md:text-lg uppercase font-bold text-white">
            Contador de Calorias
          </h1>
          <button
            onClick={() => dispatch({ type: "remover-all" })}
            className="disabled:opacity-20 bg-gray-800 hover:bg-gray-900 transition-all duration-300 px-4 py-2 rounded uppercase font-bold text-white"
            disabled={ !resetear }
          >
            Resetear App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-3">
        <div className="max-w-4xl mx-auto">
          <Formulario dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
          <div className="max-w-4xl mx-auto">
              <CaloriaTracker state={ state.actividad }/>
          </div>
      </section>

      <section className="max-w-4xl mx-auto p-10 px-3">
        <ListaActividad state={state.actividad} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;

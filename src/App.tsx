import { useEffect } from "react";
import Formulario from "./components/Formulario";
import ListaActividad from "./components/ListaActividad";
import CaloriaTracker from "./components/CaloriaTracker";
import { useActividad } from "./hooks/useActividad";

function App() {

  const { state, dispatch, resetear } = useActividad();

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
          <Formulario />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
          <div className="max-w-4xl mx-auto">
              <CaloriaTracker/>
          </div>
      </section>

      <section className="max-w-4xl mx-auto p-10 px-3">
        <ListaActividad/>
      </section>
    </>
  );
}

export default App;

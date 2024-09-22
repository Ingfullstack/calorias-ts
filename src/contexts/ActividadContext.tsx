import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { ActividadAction, ActividadReducer, ActividadState, initialState } from "../hooks/actividadReducer";

type Props = {
    state: ActividadState
    dispatch: Dispatch<ActividadAction>
    resetear: boolean
}


export const ActividadContext = createContext<Props>( {} as Props );

export const ActividadProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(ActividadReducer, initialState);
    const resetear = useMemo(() => state.actividad.length > 0, [state.actividad]);

    return(
        <ActividadContext.Provider value={{
            state,
            dispatch,
            resetear
        }}>
            { children }
        </ActividadContext.Provider>
    )
}
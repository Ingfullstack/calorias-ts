import { Actividades } from "../types"

export type ActividadAction = 
    { type: 'agregar-actividad', payload: { actividad: Actividades } } |
    { type: 'activeId', payload: { id: Actividades['id'] } } |
    { type: 'remover', payload: { id: Actividades['id'] } } |
    { type: 'remover-all'} 

export type ActividadState = {
    actividad: Actividades[]
    activeId:  Actividades['id']
}

const inicial = (): Actividades[] => {
    const localStorageActividad = localStorage.getItem('actividad');
    return localStorageActividad ? JSON.parse(localStorageActividad): []
}

export const initialState: ActividadState = {  
    actividad: inicial(),
    activeId:  ''
}

export const ActividadReducer = (state: ActividadState = initialState, action: ActividadAction) => {


    if (action.type === 'agregar-actividad') {

        const existe = state.actividad.find((item) => item.id === state.activeId);
        let actualizar: Actividades[] = []

        if (existe) {
            
            actualizar = state.actividad.map((item) => item.id === state.activeId ? action.payload.actividad : item)

        }else{
            actualizar = [...state.actividad, action.payload.actividad]   
        }

        return{
            ...state,
            actividad: actualizar,
            activeId: ''
        }
    }

    if (action.type === 'activeId') {
        
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'remover'){

        return{
            ...state,
            actividad: state.actividad.filter((item) => item.id !== action.payload.id)
        }
    }

    if (action.type === 'remover-all') {
        
        return{
            ...state,
            actividad: []
        }
    }

    return state
}
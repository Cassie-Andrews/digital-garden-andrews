import { useContext, createContext, useReducer } from 'react'
import initialState from './state'
import reducer from './reducer'

export const PlantContext = createContext()

export const usePlantContext = () => {
    const context = useContext(PlantContext)
    if (context === undefined)
        throw new Error('usePlantContext must be used within PlantProvider')
    return context
}

export const PlantProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <PlantContext.Provider value={[state, dispatch]} {...props} />
}
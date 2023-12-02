import { createContext, useContext } from 'react'
const AppContext = createContext()
export const AppContextProvider = AppContext.Provider
export const UseAppContext = () => useContext(AppContext)

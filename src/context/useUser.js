import { createContext, useContext, Context } from 'react'
import { useAuth } from '../hooks/useAuth'

const userContext = createContext({
  authUser: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: async () => {}
})

export function UserProvider({ children }) {
  const auth = useAuth()
  return <userContext.Provider value={auth}>{children}</userContext.Provider>
}

export const useUser = () => useContext(userContext)

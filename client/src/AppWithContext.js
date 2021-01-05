import React, { useState, useEffect, createContext } from 'react'

import App from './App'
import { authenticate } from "./services/auth";


export const AuthContext = createContext(false)
export const LoadedContext = createContext(false)

export default function AppWithContext() {
  const [user, setUser] = useState(false)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setUser(user);
      }
      setLoaded(true);
    })();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <App />
    </AuthContext.Provider>
  )
}

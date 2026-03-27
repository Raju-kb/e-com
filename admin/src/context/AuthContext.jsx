import React, { createContext } from 'react'

export const authDataContext = createContext()
function AuthContext({children}) {
    // Change this to your local backend URL during development
    let serverUrl = "https://e-com-mtf6.onrender.com"
    // For production, use: "https://ecommerce-website-ai-support-backend.onrender.com"

    let value = {
      serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
      
    </div>
  )
}

export default AuthContext

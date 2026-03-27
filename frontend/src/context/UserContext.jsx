import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const userDataContext = createContext()
function UserContext({children}) {
    let [userData,setUserData] = useState(null)
    let [isFetching,setIsFetching] = useState(true)
    let {serverUrl} = useContext(authDataContext)

   const getCurrentUser = useCallback(async () => {
        setIsFetching(true)
        try {
            let result = await axios.get(serverUrl + "/api/user/getcurrentuser", { withCredentials: true })
            setUserData(result.data)
            console.log('getCurrentUser:', result.data)
            return result.data
        } catch (error) {
            setUserData(null)
            console.log('getCurrentUser error:', error?.response?.data?.message || error)
            return null
        } finally {
            setIsFetching(false)
        }
    }, [serverUrl])

    useEffect(()=>{
     getCurrentUser()
    },[getCurrentUser])

    let value = {
     userData, setUserData, getCurrentUser, isFetching
    }

  return (
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
  )
}

export default UserContext

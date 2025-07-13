import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const userDatacontext = createContext()

function UserContext({ children }) {
  const [userData, setUserData] = useState("")
  const [showsearch, setshowsearch] = useState(false) 

  const getCurrentuser = async () => {
    try {
      const result = await axios.post("http://localhost:8000/api/user/getcurrentuser", {}, { withCredentials: true })
      setUserData(result.data)
      console.log(result.data)
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentuser()
  }, [])

  const value = {
    userData,
    setUserData,
    getCurrentuser,
    showsearch,        
    setshowsearch      
  }

  return (
    <userDatacontext.Provider value={value}>
      {children}
    </userDatacontext.Provider>
  )
}

export default UserContext

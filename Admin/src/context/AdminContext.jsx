import React , {createContext ,useEffect,useState}from 'react'
import axios from 'axios'
export const adminDataContext = createContext()
function AdminContext ({children}) {
let [adminData,setAdminData] = useState(null)

const getAdmin  = async()=>{
    try{
        let result = await axios.get("https://aimart.onrender.com/api/user/getadmin",{withCredentials:true})
        setAdminData(result.data)
        console.log(result.data)
    }
    catch(error){
     setAdminData(null)
     console.log(error)
    }
}
useEffect(()=>{
    getAdmin()
},[])
let value={
    adminData,setAdminData, getAdmin
}
  return (
    <div>
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    </div>
  )
}

export default AdminContext

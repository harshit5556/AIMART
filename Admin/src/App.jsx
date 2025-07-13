import React, { useContext } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Lists from './pages/Lists'
import Add from './pages/Add'
import Login from './pages/Login'
import Order from './pages/Order'
import { adminDataContext } from './context/AdminContext'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  let {adminData} = useContext(adminDataContext) 
  return (
    <>
     <ToastContainer />
    {!adminData ? <Login/> : <>
      <Routes>
        <Route path ='/' element= {<Home/>}/>
        <Route path ='/add' element= {<Add/>}/> 
        <Route path ='/lists' element= {<Lists/>}/> 
        <Route path ='/login' element= {<Login/>}/> 
        <Route path ='/order' element= {<Order/>}/>  
      </Routes>
      </>
    }
    </>
  )
}

export default App
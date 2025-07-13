import React, { useContext } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Registration from './pages/registration';
import Home from './pages/Home';
import Login from './pages/Login';
import Nav from './component/Nav';
import { userDatacontext } from './context/userContext';
import About from './pages/About';
import Collections from './pages/Collections';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaceOrder from './pages/PlaceOrder';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Notfound from './pages/Notfound';
import AI from './component/AI'
const App = () => {
  const { userData } = useContext(userDatacontext);
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      {userData && <Nav />}
      <Routes>
        <Route
          path='/signup'
          element={
            userData ? (
              <Navigate to={location.state?.from || '/'} />
            ) : (
              <Registration />
            )
          }
        />

        <Route
          path='/login'
          element={
            userData ? (
              <Navigate to={location.state?.from || '/'} />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path='/'
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/about'
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/collection'
          element={
            userData ? (
              <Collections />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/product'
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path='/contact'
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />
      <Route
          path='/ProductDetails/:productId'
          element={
            userData ? 
              <ProductDetails />
             :
              <Navigate to='/login' state={{ from: location.pathname }} />
            
          }
        />
        <Route
          path='/cart'
          element={
            userData ? 
              <Cart />
             :
              <Navigate to='/login' state={{ from: location.pathname }} />
            
          }
        />
        <Route
          path='/placeorder'
          element={
            userData ? 
              <PlaceOrder />
             :
              <Navigate to='/login' state={{ from: location.pathname }} />
            
          }
        />
        <Route
          path='/order'
          element={
            userData ? 
              <Order />
             :
              <Navigate to='/login' state={{ from: location.pathname }} />
            
          }
        />
        <Route path = '*' element={<Notfound/>}/>
      </Routes>
     <AI/>
    </>
  );
};

export default App;

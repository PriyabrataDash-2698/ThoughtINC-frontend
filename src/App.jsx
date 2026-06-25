import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'


import './App.css'
import Publisher from './component/Publisher'
import ViewVlog from './component/ViewVlog'

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Header from './component/Header'
import Footer from './component/Footer'
import { Toast } from 'primereact/toast'
import { setToastRef } from './hook/UseToast'
import { jwtDecode } from "jwt-decode";
import IndividualVlog from './component/IndividualVlog'
        
function App() {
   const toast = useRef(null);

   const [username,setUsername] = useState("");
   const [isLoggedin,setIsloggedin] = useState(false);
   const [userrole,setUserrole] = useState("");
   useEffect(()=>{
    setToastRef(toast.current);
    const token = sessionStorage.getItem("JWT");
     if(token){
      
      const decoded = jwtDecode(token);
      
      setIsloggedin(true);
      setUsername(decoded?.name);
      setUserrole(decoded?.role);
    }
   },[])
  const token = sessionStorage.getItem("JWT");
  const decoded = token ? jwtDecode(token) : null;

const [publisherid, setPublisherid] = useState(decoded?.publisherid || null);
  return (
    <>

      <PrimeReactProvider>
        <BrowserRouter>
          <Toast ref={toast} />
          <Header username={username}
            setUsername={setUsername}
            isLoggedin={isLoggedin}
            setIsloggedin={setIsloggedin}
            userrole={userrole}
            setUserrole={setUserrole} />
          <Routes>

            <Route path='/' element={<Navigate to="/vlogs/APPROVED" replace />}></Route>
            <Route path="/publish" element={<Publisher publisherid={publisherid} />}></Route>
            <Route path='/review'></Route>
            <Route path='/vlogs/:status' element={<ViewVlog userrole={userrole} publisherid={publisherid} />}></Route>
            <Route path='/vlog/:id' element={<IndividualVlog />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </PrimeReactProvider>

    </>
  )
}

export default App

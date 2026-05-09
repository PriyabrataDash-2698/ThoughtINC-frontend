import { useEffect, useRef, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
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
  return (
    <>
<Toast ref={toast} />
    <Header username={username}
            setUsername={setUsername}
            isLoggedin={isLoggedin}
            setIsloggedin={setIsloggedin}/>
    <PrimeReactProvider>
     <BrowserRouter>
     <Routes>
      <Route path="/publish" element={<Publisher/>}></Route>
      <Route path='/review'></Route>
      <Route path='/*' element={<ViewVlog userrole={userrole} />}></Route>
     </Routes>
     </BrowserRouter>
     </PrimeReactProvider>
     <Footer/>
    </>
  )
}

export default App

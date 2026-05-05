import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'


import './App.css'
import Publisher from './component/Publisher'
import ViewVlog from './component/ViewVlog'

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Header from './component/Header'
import Footer from './component/Footer'
        
function App() {
  
  return (
    <>
    <Header/>
    <PrimeReactProvider>
     <BrowserRouter>
     <Routes>
      <Route path="/publish" element={<Publisher/>}></Route>
      <Route path='/review'></Route>
      <Route path='/*' element={<ViewVlog/>}></Route>
     </Routes>
     </BrowserRouter>
     </PrimeReactProvider>
     <Footer/>
    </>
  )
}

export default App

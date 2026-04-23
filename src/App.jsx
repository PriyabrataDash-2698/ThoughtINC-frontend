import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'


import './App.css'
import Publisher from './component/Publisher'
import ViewVlog from './component/ViewVlog'

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        
function App() {
  
  return (
    <>
    <PrimeReactProvider>
     <BrowserRouter>
     <Routes>
      <Route path="/publish" element={<Publisher/>}></Route>
      <Route path='/review'></Route>
      <Route path='/*' element={<ViewVlog/>}></Route>
     </Routes>
     </BrowserRouter>
     </PrimeReactProvider>
    </>
  )
}

export default App

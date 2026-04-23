import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'


import './App.css'
import Publisher from './component/Publisher'

function App() {
  
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/*" element={<Publisher/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

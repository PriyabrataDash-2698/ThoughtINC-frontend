import React, { useState } from 'react'
import AuthControll from './AuthControll';

const Header = () => {
    const [show,setShow]= useState(false);
  return (
    <div>
        <a href="http://">Publish</a>
        <a href="">home</a>
        <div>
        <button onClick={()=>setShow(true)}>Login</button>
        <AuthControll show={show} setShow={setShow}/>
        
        </div>
        <a href="signup">signup</a>
    </div>
  )
}

export default Header
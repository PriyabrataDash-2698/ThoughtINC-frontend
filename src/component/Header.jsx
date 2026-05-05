import React, { useState } from 'react'
import AuthControll from './AuthControll';

const Header = () => {
    const [show,setShow]= useState(false);
  return (
    <div>
        <a href="http://">Publish</a>
        <a href="">home</a>
        <button onClick={()=>setShow(true)}>Login</button>
        <AuthControll visible={show}/>
        <a href="signup">signup</a>
    </div>
  )
}

export default Header
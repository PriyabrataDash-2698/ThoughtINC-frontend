import React, { useState } from 'react'
import AuthControll from './AuthControll';
import SignupController from './SignupController';
import { Button } from 'primereact/button';

const Header = () => {
    const [showlogin,setShowlogin]= useState(false);
    const [showsignup,setShowsignup]= useState(false);
  return (
    <>  
      <div className='flex justify-between'>
        <div className='text-2xl font-bold'>
          Thought <span className='text-amber-400'>INC</span>
          <span className='ml-2 text-[10px]'>A FalseFire Company</span>
          </div>
        <div className='flex'>
          <div>
            <Button  severity="secondary" raised onClick={() => setShowlogin(true)}>Login</Button>
            <AuthControll show={showlogin} setShow={setShowlogin} />
          </div>
          <div className='ml-2'>
            <Button severity="info" raised onClick={() => sessionStorage.clear()}>Logout</Button>
          </div>
          <div className='ml-2'>
            <Button severity="warning" raised onClick={() => setShowsignup(true)}>SignUp</Button>
            <SignupController showsignup={showsignup} setShowsignup={setShowsignup}/>
          </div>
        </div>
      </div>
    </>

  )
}

export default Header
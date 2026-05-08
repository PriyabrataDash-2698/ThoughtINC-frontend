import React, { useEffect, useState } from 'react'
import AuthControll from './AuthControll';
import SignupController from './SignupController';
import { Button } from 'primereact/button';


const Header = ({username,
   setUsername,
   isLoggedin,
   setIsloggedin}) => {
    const [showlogin,setShowlogin]= useState(false);
    const [showsignup,setShowsignup]= useState(false);

   

   const handleLogout =()=>{
    sessionStorage.clear();
    
      setUsername("");
   setIsloggedin(false);
   }
   
  return (
    <>  
      <div className='flex justify-between'>
        <div className='text-2xl font-bold'>
          Thought <span className='text-amber-400'>INC</span>
          <span className='ml-2 text-[10px]'>A FalseFire Company</span>
          </div>
        {!isLoggedin ?
          (<div className='flex'>
            <div>
              <Button severity="secondary" raised onClick={() => setShowlogin(true)}>Login</Button>
              <AuthControll show={showlogin} setShow={setShowlogin} setUsername={setUsername} setIsloggedin={setIsloggedin} />
            </div>
            
            <div className='ml-2'>
              <Button severity="warning" raised onClick={() => setShowsignup(true)}>SignUp</Button>
              <SignupController showsignup={showsignup} setShowsignup={setShowsignup} />
            </div>
          </div> ):
         ( <div className='flex justify-around'>
            <p className='text-center'>Welcome {username}</p>
            <div className='ml-2'>
              <Button severity="info" raised onClick={handleLogout}>Logout</Button>
            </div>
          </div>)
        }
      </div>
    </>

  )
}

export default Header
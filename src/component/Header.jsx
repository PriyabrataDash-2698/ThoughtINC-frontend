import React, { useEffect, useState ,useRef} from 'react'
import AuthControll from './AuthControll';
import SignupController from './SignupController';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
        

const Header = ({ username,
  setUsername,
  isLoggedin,
  setIsloggedin,
userrole
,setUserrole }) => {
  
  const [showlogin, setShowlogin] = useState(false);
  const [showsignup, setShowsignup] = useState(false);
  const initials = username.substring(0, 2).toUpperCase();
  const handleLogout = () => {
    
  }
  const navigate = useNavigate();
  const publisheritems = [ 
        {
          label: 'Rejected Vlogs',
          icon: 'pi pi-server',
          command: () => {
           navigate('/vlogs/REJECTED')
          }
        },
        {
          label: 'Publish Vlog',
          icon: 'pi pi-upload',
          command: () => {
           navigate('/publish')
          }
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
           sessionStorage.clear();
           setUsername("");
           setIsloggedin(false);
           window.location.href = '/vlogs/APPROVED'
          }
        }
  ]
   const Adminitems = [
        {
          label: 'Pending Vlogs',
          icon: 'pi pi-bolt',
          command: () => {
           navigate('/vlogs/PENDING')
          }
        },
         {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
           sessionStorage.clear();
           setUsername("");
           setIsloggedin(false);
           window.location.href = '/vlogs/APPROVED'
          }
        }
  ]
  const menuLeft = useRef(null);
  const toast = useRef(null);
  return (
    <>
      <div className='flex justify-between'>
        <div className='text-lg sm:text-2xl font-bold cursor-pointer' onClick={()=>navigate("/vlogs/APPROVED")}>
          Thought <span className='text-amber-400'>INC</span>
          <br />
          <span className='ml-1.5 sm:ml-2 text-[8px] sm:text-[10px]'>A FalseFire Company</span>
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
          </div>) :
          (
          
          <div className='flex justify-around'>
            <Toast ref={toast}></Toast>
            {
              userrole=="ADMIN"?
            <Menu model={Adminitems} popup ref={menuLeft} id="popup_menu_left" />
            :
             <Menu model={publisheritems} popup ref={menuLeft} id="popup_menu_left" />
            }
            <div
            onClick={(event) => menuLeft.current.toggle(event)} 
            aria-controls="popup_menu_left" 
            aria-haspopup 
              className="
              cursor-pointer
          w-10 h-10 rounded-full bg-blue-500 text-white 
          flex items-center justify-center font-bold text-lg hadow-md"
            >
              {initials}
              <i className='pi pi-chevron-down font-size[10px]'></i>
            </div>
            <p className='flex sm:items-start text-lg sm:text-2xl font-bold ml-2'>

              Welcome {username}</p>
          </div>)
        }
      </div>
    </>

  )
}

export default Header
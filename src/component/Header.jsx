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
    sessionStorage.clear();

    setUsername("");
    setIsloggedin(false);
  }
  const navigate = useNavigate();
  const publisheritems = [
        {
          label: 'Pending Vlogs',
          icon: 'pi pi-bolt',
          command: () => {
           navigate('/vlogs/PENDING')
          }
        },
        {
          label: 'Rejected Vlogs',
          icon: 'pi pi-server',
          command: () => {
           navigate('/vlogs/REJECTED')
          }
        }
  ]
   const Adminitems = [
        {
          label: 'Pending Vlogs',
          icon: 'pi pi-bolt'
        },
        {
          label: 'Rejected Vlogs',
          icon: 'pi pi-server'
        }
  ]
  const menuLeft = useRef(null);
  const toast = useRef(null);
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
          w-10 h-10 rounded-full bg-blue-500 text-white 
          flex items-center justify-center font-bold text-lg hadow-md"
            >
              {initials}
            </div>
            <p className='flex items-center text-2xl font-bold ml-2'>

              Welcome {username}</p>
            <div className='ml-2'>
              <Button className='bg-blue-500' raised onClick={handleLogout}>Logout</Button>
            </div>
          </div>)
        }
      </div>
    </>

  )
}

export default Header
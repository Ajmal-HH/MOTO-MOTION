import motologo from '../../assets/moto-motion-logo.png'
import userlogo from '../../assets/userlog.jpg'
import { Link,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from '../../utils/axiosConfig'
import {toast} from 'react-toastify'


function Header() {

  const token = Cookies.get('jwt');
  const navigate = useNavigate()

  const handleLogout = () =>{
    axios.get('/user-logout')
    .then((data)=>{
      toast.success('User Logout!')
      navigate('/')
    })
  }

  return (
    <div className=" w-full bg-white h-16 flex  items-center rounded-b-full">
      <div className="w-16 h-8 bg-red-300 ml-5 cursor-pointer">
        <img src={motologo} alt="logo" className='w-full h-full ' />
      </div>
      <h1 className="text-center text-2xl text-black ml-3 font-extrabold whitespace-nowrap cursor-pointer">MOTO MOTION</h1>
      <div className='font-googleFont flex text-xl ml-48 '>
        <Link to={'/'} className='ml-10 cursor-pointer'>HOME</Link>
        <Link to={'/bikes'} className='ml-10 cursor-pointer'>BIKES</Link>
        <Link to={'/bikeowner-login'} className='ml-10 cursor-pointer whitespace-nowrap '>BECOME A HOST</Link>
        <h3 className='ml-10 cursor-pointer'>ABOUT</h3>
        <h3 className='ml-10 cursor-pointer'>CONTACT</h3>
      </div>
      {
        token ? (
          <div className='flex'>
            <button onClick={handleLogout} className="border border-red-500 text-red-500 ml-16 px-4  rounded hover:bg-red-500 hover:text-white">
              LOGOUT
            </button>
            <div className='user w-10 h-10 bg-red-400  ml-5 cursor-pointer'>
             <Link to={'/userprofile'}><img src={userlogo} alt="userlogo" className='w-full h-full' /></Link> 
            </div>
          </div>
        ) :
          (
            <div className="ml-14 flex font-googleFont text-xl">
              <Link to={'/login'} className="cursor-pointer">Sign In</Link>
              <span className="mx-2">/</span>
              <Link to={'/signup'} className="cursor-pointer">Sign Up</Link>
            </div>
          )
      }

    </div>

  )
}

export default Header

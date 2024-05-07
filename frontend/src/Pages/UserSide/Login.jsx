import { Link , useNavigate } from 'react-router-dom'
import bgImage from '../../assets/a.jpg'
import { useEffect, useState } from 'react'
import axios from '../../utils/axiosConfig'

import {toast} from 'react-toastify'
import Cookies from 'js-cookie'
import { signInValidationSchema } from '../../FormValidation'


function Login() {
 
  const token = Cookies.get('jwt')

  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try {
      await signInValidationSchema.validate({email, password},{abortEarly : false})

      axios.post(`/login`,{email,password})
      .then((result)=>{
        toast.success('Login successfully')
        navigate('/')
      })
      .catch((err)=>{
        console.log(err.response.data.message);
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
          //setErrors(err.response.data.message)
        } else {
          toast.error('An error occurred. Please try again later.');
        }
      })
    } catch (error) {
      const newErrors = {}
      
      error.inner.forEach((err)=>{
        newErrors[err.path] = err.message
      })
      setErrors(newErrors)
    }
  }
  return (
    <>
    <div className='min-h-screen bg-cover' style= {{ backgroundImage: `url(${bgImage})`  }} >
    <div className='flex flex-col items-center' >
     <div className=' bg-gray-600 min-h-[400px] w-[400px] rounded-lg bg-opacity-70 mt-20'>
         <h1 className='text-center font-googleFont font-bold text-2xl mt-4'>SIGNIN</h1>
         <form onSubmit={handleSubmit} className='mt-5 ml-10'>
             <label htmlFor="name" className='font-googleFont text-lg'>Email</label>
             <input type="email" 
                 placeholder='Enter the email'
                 className='block w-80 h-8 rounded-xl pl-2'
                 onChange={(e)=>setEmail(e.target.value)}
             />
              {errors.email && <div className='text-red-600'>{errors.email}</div>}
             <label htmlFor="name" className='font-googleFont text-lg'>Password</label>
             <input type="password" 
                 placeholder='Enter Password'
                 className='block w-80 h-8 rounded-xl pl-2'
                 onChange={(e)=>setPassword(e.target.value)}
             />
             {errors.password && <div className='text-red-600'>{errors.password}</div>}
           
           <button type='submit'  className="py-2 px-5 mt-5 ml-28  bg-amber-500 text-black font-googleFont font-semibold  rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
           SIGNIN
           </button> 
         </form>
         <div className="flex items-center justify-center mt-2 ml-12 mr-12">
                   <hr className="border-t border-yellow-500 w-full" />
                   <span className="px-3 text-white text-xs">OR</span>
                   <hr className="border-t border-yellow-500 w-full" />
                 </div>
                <p className='font-googleFont text-center mt-12  text-white'>Forgot Password?</p>
              <h1 className='font-googleFont text-lg text-center'>Dont't have a account?</h1>
              <Link to={'/signup'} className='font-googleFont text-lg ml-40  hover:text-red-700 cursor-pointer '>SignUp Here</Link>
         </div>
 
    
 
    </div>
   </div>
   </>
  )
}

export default Login

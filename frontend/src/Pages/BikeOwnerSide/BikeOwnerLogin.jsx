import React, { useEffect, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import Header from '../../Components/UserSide/Header'
import axios from '../../utils/axiosConfig'
import {toast} from 'react-toastify'
import Cookies from 'js-cookie'
import { signInValidationSchema } from '../../FormValidation'


function BikeOwnerLogin() {
  const token = Cookies.get('bikeOwner-jwt')

  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (token) {
      navigate('/bikeowner-details');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try {
      await signInValidationSchema.validate({email,password},{abortEarly : false})

      axios.post(`/bikeowner/bikeowner-login`,{email,password})
      .then((result)=>{
        toast.success('Login successfully')
        navigate('/bikeowner-details')
      })
      .catch((err)=>{
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
          setErrors(err.response.data.message)
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
  //   const trimedemail = email.trim()
  //   const trimedpassword = password.trim()

  //   if(trimedemail == '' || trimedpassword==''){
  //     toast.error('Empty input fields');
  //   }
  //   else if(!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(trimedemail)){
  //     toast.error('Please enter a valid gmail address (e.g., example@gmail.com).');

  //   }
  //   else if(trimedpassword.length==0){
  //     toast.error('Please enter the password')
  //   }else{
  //   axios.post('http://localhost:5001/bikeowner/bikeowner-login',{email,password},{withCredentials : true})
  //   .then((result)=>{
  //     toast.success('Login successfully')
  //     navigate('/bikeowner-details')
  //   })
  //   .catch((err)=>{
  //     if (err.response && err.response.data && err.response.data.message) {
  //       toast.error(err.response.data.message);
  //     } else {
  //       toast.error('An error occurred. Please try again later.');
  //     }
  //   })
  // }
  }

  return (
    <div className='bg-green-300 min-h-screen w-full flex flex-col'>
      <Header />
      <div className='flex flex-grow justify-center items-center'>
    <div className='w-72 h-72 bg-white rounded-3xl'>
      <h1 className='text-center font-googleFont text-xl pt-3'>BIKE OWNER LOGIN</h1>
      <div className='pl-6 mt-5 font-googleFont'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <div>
              <input
                type="email"
                placeholder='Enter email'
                onChange={(e)=>setEmail(e.target.value)}
                className='border border-yellow-500 rounded-3xl pl-3 h-8 w-60'
              />
              {errors.email && <div className='text-red-600'>{errors.email}</div>}

            </div>
          </div>
          <div className="mb-3">
            <label>Password</label>
            <div>
              <input
                type="password"
                placeholder='Enter password'
                onChange={(e)=>setPassword(e.target.value)}
                className='border border-yellow-500 rounded-3xl pl-3 h-8 w-60'
              />
              {errors.password && <div className='text-red-600'>{errors.password}</div>}
            </div>
          </div>
          <button type='submit' className='bg-yellow-500 rounded-3xl w-20 mt-5 ml-20' >LOGIN</button>
        </form>
        <p className='text-center pr-6 mt-4'>Don't have an account?<Link to={'/bikeowner-signup'} className='text-blue-900'>Register</Link></p>
      </div>
    </div>
    </div>
  </div>
  )
}

export default BikeOwnerLogin

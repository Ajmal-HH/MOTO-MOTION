import  { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Header from '../../Components/UserSide/Header';
import axios from '../../utils/axiosConfig'
import {toast} from 'react-toastify'
import Cookies from 'js-cookie'
import { signUpValidationSchema } from '../../FormValidation';



function BikeOwnerSignup() {
  const token = Cookies.get('bikeOwner-jwt')

  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [mobile,setMobile] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (token) {
      navigate('/bikeowner-details');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try {
      await signUpValidationSchema.validate({name,email,mobile,password},{abortEarly : false})
      
      axios.post(`/bikeowner/bikeowner-signup`,{bikeowner_name: name, email, password, mobile})
      .then(()=>{
        toast.success('Email verified please login')
        navigate('/bikeowner-login')
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

  }
  

  return (
    <div className='bg-green-300 min-h-screen flex flex-col '>
      <Header />

      <div className='flex flex-grow justify-center items-center'>
        <div className='w-72 min-h-[450px] bg-white rounded-3xl'>
          <h1 className='text-center font-googleFont text-xl pt-3'>BIKE OWNER SIGNUP</h1>
          <div className='pl-6 mt-5 font-googleFont'>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <div>
                  <input
                    type="text"
                    placeholder='Enter name'
                    onChange={(e)=>setName(e.target.value)}
                    className='border border-yellow-500 rounded-3xl pl-3 h-8 w-60'
                  />
                  {errors.name && <div className='text-red-600'>{errors.name}</div>}
                </div>
              </div>
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
                <label>Mobile</label>
                <div>
                  <input
                    type="number"
                    placeholder='Enter mobile number'
                    onChange={(e)=>setMobile(e.target.value)}
                    className='border border-yellow-500 rounded-3xl pl-3 h-8 w-60'
                  />
                 {errors.mobile && <div className='text-red-600'>{errors.mobile}</div>}
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
              <button type='submit' className='bg-yellow-500 rounded-3xl w-20 mt-5 ml-20'>SIGNUP</button>
            </form>
            <p className='text-center pr-6 mt-8'>Already have an account?<Link to={'/bikeowner-login'} className='text-blue-900'>SignIn</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BikeOwnerSignup;

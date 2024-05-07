import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../../assets/a.jpg';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import * as Yup from 'yup'
import axios from '../../utils/axiosConfig'

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({})

  const token = Cookies.get('jwt')

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token,navigate])

  const formData = new FormData()

  formData.append('name',name)
  formData.append('email',email)
  formData.append('mobile',mobile)
  formData.append('password',password)

  const validationSchema =  Yup.object({
    name : Yup.string()
              .trim()
              .required('Name is required')
              .min(3,"Name must be atleast 3 characters"),
    email : Yup.string()
               .matches(/^[a-zA-Z0-9._-]+@gmail\.com$/,'Please enter a valid gmail address (e.g., example@gmail.com).')
               .email('Invalid email formate')
               .required('Email is required'),
    mobile : Yup.string()
                .matches(/^\d{10}$/,"mobile number must be 10 digits")
                .required('Mobile number is required'),
    password : Yup.string()
                  .trim()
                  .required('Password is required')
                  .min(6,'Password must be atleast 6 characters')
  })
  // console.log(process.env,">>>>");
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await validationSchema.validate({name,email,mobile,password}, {abortEarly : false})

     axios.post(`/verifyuser`, { name, email, password, mobile })
     .then((data) => {
       navigate('/otp');
     }).catch((err) => {
       if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
        setErrors(err.response.data.message)
      } else {
         toast.error('An error occurred. Please try again later.');
       }
     });
    } catch (error) {
      if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error(error); // Log the error for debugging purposes
        toast.error('An error occurred. Please try again later.');
      }
    }

    // const trimmedName = name.trim();
    // const trimmedEmail = email.trim();
    // const trimmedPassword = password.trim();

    // if (trimmedName === '' || trimmedEmail === '' || trimmedPassword === '' || mobile.length === 0) {
    //   toast.error('Empty input fields');
    // } else if (trimmedName.length < 3) {
    //   toast.error('Please enter a valid name (at least 3 characters)');
    // } else if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(trimmedEmail)) {
    //   toast.error('Please enter a valid gmail address (e.g., example@gmail.com).');
    // } else if (mobile.length < 10 || mobile.length >= 11) {
    //   toast.error('Please enter a valid mobile number');
    // } else if (trimmedPassword.length < 6) {
    //   toast.error('Please enter at least 6 characters for the password');
    // } else {
    //   axios.post('http://localhost:5001/verifyuser', { name: trimmedName, email: trimmedEmail, password: trimmedPassword, mobile }, { withCredentials: true })
    //     .then((data) => {
    //       navigate('/otp');
    //     }).catch((err) => {
    //       if (err.response && err.response.data && err.response.data.message) {
    //         toast.error(err.response.data.message);
    //       } else {
    //         toast.error('An error occurred. Please try again later.');
    //       }
    //     });
    // }
  };

  return (
    <>
      <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(${bgImage})` }}>
        <div className='flex flex-col items-center'>
          <div className=' bg-gray-600 min-h-[500px] w-[400px] rounded-lg bg-opacity-70 mt-20'>
            <h1 className='text-center font-googleFont font-bold text-2xl mt-4'>SIGNUP</h1>
            <form onSubmit={handleSubmit} className='mt-5 ml-10 '>
              <label htmlFor="name" className='font-googleFont text-lg'>Name</label>
              <input type="text"
                placeholder='Enter the name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              {errors.name && <div className='text-red-600'>{errors.name}</div>}
              <label htmlFor="email" className='font-googleFont text-lg'>Email</label>
              <input type="email"
                name='email'
                placeholder='Enter the email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              {errors.email && <div className='text-red-600'>{errors.email}</div>}
              <label htmlFor="mobile" className='font-googleFont text-lg'>Mobile</label>
              <input type="number"
                name='number'
                placeholder='Enter Mobile Number'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              {errors.mobile && <div className='text-red-600'>{errors.mobile}</div>}

              <label htmlFor="password" className='font-googleFont text-lg'>Password</label>
              <input type="password"
                name='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              {errors.password && <div className='text-red-600'>{errors.password}</div>}


              <button type='submit' className="py-2 px-5 mt-5 ml-28  bg-amber-500 text-black font-googleFont font-semibold  rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
                SIGNUP
              </button>
            </form>
            <div className="flex items-center justify-center mt-2 ml-12 mr-12">
              <hr className="border-t border-gray-300 w-full" />
              <span className="px-3 text-white text-xs">OR</span>
              <hr className="border-t border-gray-300 w-full" />
            </div>
            <h1 className='font-googleFont text-lg text-center mt-12'>Already have a account?</h1>
            <Link to={'/login'} className='font-googleFont text-lg ml-40 hover:text-red-700 cursor-pointer '>Login Here</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;

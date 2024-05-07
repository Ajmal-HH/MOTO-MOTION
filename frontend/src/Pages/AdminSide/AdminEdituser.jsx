import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'


function AdminEdituser() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email,setEmail] = useState('')

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

//   const token = Cookies.get('jwt')

  useEffect(()=>{
  axios.get(`/admin/admin-loadedituser?userId=${userId}`)
  .then((response)=>{
   // setUser(response.data)
    setName(response.data.name);
    setMobile(response.data.mobile);
    setEmail(response.data.email);
  })
  .catch((err)=>{
    toast.error('Error to fetch userData')
  })
  },[userId])

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    // const trimmedMobile = mobile.trim();

    if (trimmedName === ''  || mobile === '') {
      toast.error('Empty input fields');
    } else if (trimmedName.length < 3) {
      toast.error('Please enter a valid name (at least 3 characters)');
    } else if (mobile.length < 10 || mobile.length >= 11) {
      toast.error('Please enter a valid mobile number');
    }  else {
      axios.post(`/admin/admin-edituser`, {_id : userId, name: trimmedName,   mobile})
        .then((data) => {
          toast.success('User data updated!!')
          navigate('/user-details');
        }).catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error('An error occurred. Please try again later.');
          }
          navigate('/user-details');
        });
    }
  };

  return (
    <>
      <div className='min-h-screen bg-cover'>
        <div className='flex flex-col items-center'>
          <div className=' bg-gray-600 h-[400px] w-[400px] rounded-lg bg-opacity-70 mt-20'>
            <h1 className='text-center font-googleFont font-bold text-2xl mt-4'>EDIT USER</h1>
            <form onSubmit={handleSubmit} className='mt-5 ml-10 '>
              <label htmlFor="name" className='font-googleFont text-lg'>Name</label>
              <input type="text"
                placeholder='Enter the name'
                name='name'
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              <label htmlFor="email" className='font-googleFont text-lg'>Email</label>
              <input type="email"
                name='email'
                placeholder='Enter the email'
                value={email}
                className='block w-80 h-8 rounded-xl pl-2'
              />
              <label htmlFor="mobile" className='font-googleFont text-lg'>Mobile</label>
              <input type="number"
                name='number'
                placeholder='Enter Mobile Number'
                defaultValue={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className='block w-80 h-8 rounded-xl pl-2'
              />
           
              <button type='submit' className="py-2 px-5 mt-5 ml-28  bg-amber-500 text-black font-googleFont font-semibold  rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
                EDIT USER
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminEdituser;


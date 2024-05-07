import React, { useState } from 'react'
import axios from '../../utils/axiosConfig'


function AddBike() {
    const [bikeName,setBikeName] = useState('')
    const [bikeNO,setBikeNo] = useState('')
    const [location,setLocation] = useState('')
    const [bikeCC,setBikeCC] = useState()
    const [rent,setRent] = useState()
    const [bikeType,setBikeType] = useState('')
    const [image,setImage] = useState([])

    const handleSubmit = (e)=>{
        e.preventDefault()

        axios.post(`/bikeowner/addbike`,{bikeName,bikeNO,location,bikeCC,rent,bikeType,image})
        .then((result)=>{
          toast.success('New bike added')
        })
        .catch((err)=>{
          if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error('An error occurred. Please try again later.');
          }
        })
    }

  return (
    <div className='w-full min-h-screen bg-white flex flex-col  justify-center items-center'>
        <div className='flex flex-col items-center' >
     <div className=' bg-gray-600 h-[560px] w-[400px] rounded-lg bg-opacity-70 mt-20'>
         <h1 className='text-center font-googleFont font-bold text-2xl mt-4'>ADD BIKE</h1>
         <form onSubmit={handleSubmit} className='mt-5 ml-10'>
             <label className='font-googleFont text-lg'>Bike Name</label>
             <input type="bikename" 
                 placeholder='Enter bike name'
                 className='block w-80 h-8 rounded-xl pl-2'
                 onChange={(e)=>setBikeName(e.target.value)}
             />
             <label  className='font-googleFont text-lg'>Bike Number</label>
             <input type="text" 
                 placeholder='Enter bike number'
                 className='block w-80 h-8 rounded-xl pl-2'
                 onChange={(e)=>setBikeNo(e.target.value)}


             />
             <label  className='font-googleFont text-lg'>Bike Location</label>
             <input type="text" 
                 placeholder='Enter location'
                 className='block w-80 h-8 rounded-xl pl-2'
                 onChange={(e)=>setLocation(e.target.value)}

             />
             <label  className='font-googleFont text-lg'>Bike CC</label>
             <input type="number" 
                 placeholder='Enter bike CC'
                 className='block w-80 h-8 rounded-xl pl-2'
                 onChange={(e)=>setBikeCC(e.target.value)}

             />
             <label  className='font-googleFont text-lg'>Bike Rent</label>
             <input type="number" 
                 placeholder='Enter bike rent/hrs'
                 className='block w-80 h-8 rounded-xl pl-2'
                 onChange={(e)=>setRent(e.target.value)}

             />
             <label  className='font-googleFont text-lg'>Bike type</label>
             <input type="text" 
                 placeholder='Enter type'
                 className='block w-80 h-8 rounded-xl pl-2'
                 onChange={(e)=>setBikeType(e.target.value)}

             />
             <label  className='font-googleFont text-lg'>Add Image</label>
             <input type="image" 
                 placeholder='Add images'
                 className='block w-80 h-8 rounded-xl pl-2'

             />
           
           <button type='submit'  className="py-2 px-5 mt-5 ml-28  bg-amber-500 text-black font-googleFont font-semibold  rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
           ADD BIKE
           </button> 
         </form>
        
         </div>
 
    
 
    </div>
    </div>
  )
}

export default AddBike

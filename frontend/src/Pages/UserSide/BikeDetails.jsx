import React, { useEffect, useState } from 'react'
import Header from '../../Components/UserSide/Header'
import axios from '../../utils/axiosConfig'
import {useLocation,useNavigate} from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_BASE_URL;



function BikeDetails() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bikeId = searchParams.get('bikeId');
  const [bike,setBike] = useState({})

    useEffect(()=>{     
        axios.get(`/bike-details?bikeId=${bikeId}`)
        .then((response)=>{
          setBike(response.data)
        })
        .catch((error)=>{
          console.log('error fetch bike details:',error);
        })
      
    
    },[bikeId])
  return (
    <div className='font-googleFont'>
      <Header />
      { bike && bike?.image?.length > 0 && (
        <>
         <div className='w-full h-[420px] bg-white flex  justify-center'>
      <div className='w-[550px] h-96 bg-white mx-2 my-4 flex justify-center items-center'>
      <div className='w-[530px] h-80 rounded-xl border border-gray-400 relative'>
  <img 
    src={`${BASE_URL}/admin-assets/uploads/${bike?.image[0]}`} 
    className="img-fluid absolute inset-0 w-full h-full object-cover rounded-xl" 
    alt="Bike Image"
  />
</div>
      </div>
      <div className='w-[500px] h-96 bg-white my-4'>
      <div className='w-[480px] h-44 mx-2 my-3 bg-white rounded-xl border border-gray-400 flex items-center justify-center overflow-hidden'>
 
    <img 
    src={`${BASE_URL}/admin-assets/uploads/${bike.image[1]}`} 
    className="img-fluid max-w-full max-h-full" 
    alt="Bike Image"
  />
</div>

<div className='w-[480px] h-44 mx-2 my-3 bg-white rounded-xl border border-gray-400 flex items-center justify-center overflow-hidden'>

  <img 
    src={`${BASE_URL}/admin-assets/uploads/${bike.image[2]}`} 
    className="img-fluid max-w-full max-h-full" 
    alt="Bike Image"
  />
</div>
      </div>
      </div>
      <div className='w-full h-auto bg-slate-200 flex justify-center'>
        <div className='w-[800px] h-auto bg-white '>
            <h1 className='font-bold text-4xl pl-5'>{bike.bike_name}</h1>
            <p className='pl-5 pt-5'>Bike type : {bike.bike_type} </p>
            <p className='pl-5'>Bike No : {bike.bike_number} </p>
            <p className='pl-5'>Bike CC : {bike.bike_cc} </p>
            <p className='pl-5'>Bike location : {bike.location} </p>
            <p className='pl-5'>Bike Rent/day : {bike.price} </p>
            <p className='pl-5 pt-5 '>Rating & Review</p>
            <p className='pl-5'>* 4.5(7 Reviews)</p>


            
        <div className='w-full mt-5 h-12 bg-gray-500 flex items-center pl-5'>
            <h1 className='font-bold text-xl '>Ride Reviews</h1>
        </div>
        <div className='w-full h-auto bg-purple-400 pl-5'>
            <p>ajmal</p>
            <p>Good Bike</p>
        </div>
        </div>
        <div className='bg-gray-500 w-72 h-60 rounded-2xl border border-gray-400 '>
         <h1 className='mt-2 font-bold font-googleFont text-lg text-center'>SEARCH YOU NEXT RIDE</h1>
         <form className='ml-5'>
             <label className='font-googleFont text-lg'>Pickup</label>
             <br />
             <input type="date" 
             className=' h-8 bg-[#D9D9D9] rounded-l-md pl-2'
             />
             <input type="time" 
             placeholder='Date'
             className='h-8 ml-1 bg-[#D9D9D9] rounded-r-md pl-2'
             />
             <label className='font-googleFont text-lg '>Dropoff</label>
             <br />
             <input type="date" 
             className='h-8 bg-[#D9D9D9] rounded-l-md pl-2'
             />
             <input type="time" 
             placeholder='Date'
             className='h-8 ml-1 bg-[#D9D9D9] rounded-r-md pl-2'
             />
             <div className='flex justify-center mt-5 mr-5'>
             <button className='bg-[#FFB016] font-googleFont font-bold  rounded-2xl w-20 h-7 text-center '>Book Now</button>
             </div>
         </form>
     </div>  
         </div>
        </>
      )}
     
    </div>
  )
}

export default BikeDetails

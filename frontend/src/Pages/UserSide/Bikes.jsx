import React, { useEffect, useState } from 'react';
import Header from '../../Components/UserSide/Header';
import axios from '../../utils/axiosConfig'
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;


function Bikes() {
    const [bikes, setBikes] = useState([]);


    useEffect(() => {
        axios.get(`/bikes`)
            .then(response => {
                setBikes(response.data);
            })
            .catch(error => {
                console.error('Error fetching bike details:', error);
            });
    }, []);    



    return (
        <div>
            <Header />
            <div className='w-full h-20 bg-white'>
                <h1 className='text-center text-2xl font-bold font-googleFont'>Bike rentals in Cochin</h1> 
                <p className='text-center text-xl'>*All prices are exclusive of taxes and fuel. Images used for representation purposes only, actual color may vary.</p>
            </div>
            <div className='flex flex-wrap justify-start'>
                {bikes.map(bike => (
                    <div key={bike._id} className='w-72 h-[400px] bg-white border border-gray-300 rounded-xl flex flex-col items-center m-4'>
                        <div className='w-64 h-52 bg-white flex flex-col items-center'>
                            <h1 className='font-googleFont'>{bike.bike_name}</h1>
                            <div className='w-60 h-44 bg-white border border-gray-300 rounded-lg'  >
                            <img src={`${BASE_URL}/admin-assets/uploads/${bike.image[0]}`} className="object-cover w-full h-full rounded-lg " alt="Bike Image" />
                            </div>


                        </div>
                        <div className='w-64 h-10 bg-white border border-b-[#FFB016] flex items-center justify-center'>
                            <h3 className='font-googleFont'>DAILY</h3>
                        </div>
                        <div className='w-64 h-24 pt-5 bg-white border border-gray-300 font-googleFont'>
                            <p>(Min 1 day booking only)</p>
                            <p className='pl-10'>Book per-day @ ₹ {bike.price}</p>
                        </div>
                        <Link to={`/bike-details?bikeId=${bike._id}`} className='bg-[#FFB016] w-64 h-10 font-googleFont rounded-lg flex justify-center items-center'>Book Now</Link>
                    </div> 
                ))}
            </div>
        </div>
    );
}

export default Bikes;

import React, { useEffect, useState } from 'react'
import BikeOwnerSidebar from '../../Components/BikeOwnerSide/BikeOwnerSidebar'
import axios from '../../utils/axiosConfig'

import { toast } from 'react-toastify'


function BikeOwnerDetails() {
    const [bikeName, setBikeName] = useState('')
    const [bikeNO, setBikeNo] = useState('')
    const [location, setLocation] = useState('')
    const [bikeCC, setBikeCC] = useState()
    const [rent, setRent] = useState()
    const [bikeType, setBikeType] = useState('')
    const [image, setImage] = useState([])
    const [details, setDetails] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()  
        const formData = new FormData()
        //formData.append("image" , image); 
        image.forEach((file, index) => {
            formData.append(`image`, file);
        });        
        formData.append("bikeName", bikeName);
        formData.append("bikeNO", bikeNO);
        formData.append("location", location);
        formData.append("rent", rent);
        formData.append("bikeType", bikeType);
        formData.append("bikeCC", bikeCC);
        formData.append("details", details);

        // axios.post('http://localhost:5001/bikeowner/addbike', { bikeName, bikeNO, location, bikeCC, rent, bikeType, details, image }, { withCredentials: true })
        axios.post(`/bikeowner/addbike`, formData, {
         headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((result) => {
                console.log(result);
                toast.success('New bike added')
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error('An error occurred. Please try again later.');
                }
            })
    }
    return (

        <div className='w-full flex '>
            <BikeOwnerSidebar />
            <div className='bg-gray-200 w-full font-googleFont'>
                <h1 className='text-center text-2xl pt-3'>Bike Owner Details</h1>
                <div className='w-full h-56 flex  '>
                    <div className='w-32 h-36 bg-white ml-10 mt-5'></div>
                    <div className='w-full h-36 bg-white ml-5 mt-5 flex flex-col  justify-center'>
                        <p className=''>Name : Ajmal</p>
                        <p className=''>Email : bikeOwner@gmail.com</p>
                        <p className=''>Phone : 9741540916</p>
                    </div>
                </div>

                <div className='flex flex-col items-center' >
                    <div className=' bg-gray-600 h-[620px] w-[400px] rounded-lg bg-opacity-70 '>
                        <h1 className='text-center font-googleFont font-bold text-2xl mt-4'>ADD BIKE</h1>
                        <form onSubmit={handleSubmit} className='mt-5 ml-10' encType='multipart/form-data'>
                            <label className='font-googleFont text-lg'>Bike Name</label>
                            <input type="bikename"
                                placeholder='Enter bike name'
                                className='block w-80 h-8 rounded-xl pl-2'
                                onChange={(e) => setBikeName(e.target.value)}
                            />
                            <label className='font-googleFont text-lg'>Bike Number</label>
                            <input type="text"
                                placeholder='Enter bike number'
                                className='block w-80 h-8 rounded-xl pl-2'
                                onChange={(e) => setBikeNo(e.target.value)}


                            />
                            <label className='font-googleFont text-lg'>Bike Location</label>
                            <input type="text"
                                placeholder='Enter location'
                                className='block w-80 h-8 rounded-xl pl-2'
                                onChange={(e) => setLocation(e.target.value)}

                            />
                            <label className='font-googleFont text-lg'>Bike CC</label>
                            <input type="number"
                                placeholder='Enter bike CC'
                                className='block w-80 h-8 rounded-xl pl-2'
                                onChange={(e) => setBikeCC(e.target.value)}

                            />
                            <label className='font-googleFont text-lg'>Bike Rent</label>
                            <input type="number"
                                placeholder='Enter bike rent/hrs'
                                className='block w-80 h-8 rounded-xl pl-2'
                                onChange={(e) => setRent(e.target.value)}

                            />
                            <label className='font-googleFont text-lg'>Bike type</label>
                            <input type="text"
                                placeholder='Enter type'
                                className='block w-80 h-8 rounded-xl pl-2'
                                onChange={(e) => setDetails(e.target.value)}

                            />
                            <label className='font-googleFont text-lg'>Details</label>
                            <input type="text"
                                placeholder='Enter bike details'
                                className='block w-80 h-8 rounded-xl pl-2'
                                onChange={(e) => setBikeType(e.target.value)}

                            />
                            <label className='font-googleFont text-lg'>Add Image</label>
                            <input
                                type="file"
                                name="image" 
                                placeholder='Add images'
                                className='block w-80 h-8 rounded-xl pl-2'
                                accept="image/png, image/jpeg, image/jpg"
                                multiple
                                required
                                onChange={(e) => {
                                    console.log(e.target.files);
                                    const files = Array.from(e.target.files);
                                    setImage(files);
                                }}
                            />




                            <button type='submit' className="py-2 px-5 mt-5 ml-28  bg-amber-500 text-black font-googleFont font-semibold  rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
                                ADD BIKE
                            </button>
                        </form>

                    </div>



                </div>

            </div>
        </div>
    )
}

export default BikeOwnerDetails

import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';


function EditbikeOwner() {
    const [bikeName, setBikeName] = useState('');
    const [bikeNO, setBikeNo] = useState('');
    const [locations, setLocations] = useState('');
    const [bikeCC, setBikeCC] = useState('');
    const [rent, setRent] = useState('');
    const [bikeType, setBikeType] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const bikeId = searchParams.get('bikeId');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/bikeowner/bikeowner-loadbikeedit?bikeId=${bikeId}`)
            .then((response) => {
                const { bike_name, bike_number, bike_type, bike_cc, location, price, details, image } = response.data;
                setBikeName(bike_name);
                setBikeNo(bike_number);
                setBikeType(bike_type);
                setBikeCC(bike_cc);
                setLocations(location);
                setRent(price);
                setDetails(details);
                setImage(image);
            })
            .catch((err) => {
                toast.error('Error fetching bike data');
            });
    }, [bikeId]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bikeName || !bikeNO || !locations || !bikeCC || !rent || !bikeType || !details ) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const formData = new FormData();
            if (image.length > 0) {
                image.forEach((file) => formData.append('image', file));
            }            
            formData.append('bikeName', bikeName);
            formData.append('bikeNO', bikeNO);
            formData.append('locations', locations);
            formData.append('rent', rent);
            formData.append('bikeType', bikeType);
            formData.append('bikeCC', bikeCC);
            formData.append('details', details);
            formData.append('_id', bikeId);

            await axios.post(`/bikeowner/bikeowner-editbike`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Bike data updated!');
            navigate('/bikeowner-bikedetails');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred. Please try again later.');
            }
            navigate('/bikeowner-bikedetails');
        }
    };

  return (
    <div className='flex flex-col items-center' >
    <div className=' bg-gray-600 h-[620px] w-[400px] rounded-lg bg-opacity-70 '>
        <h1 className='text-center font-googleFont font-bold text-2xl mt-4'>ADD BIKE</h1>
        <form onSubmit={handleSubmit} className='mt-5 ml-10' encType='multipart/form-data'>
            <label className='font-googleFont text-lg'>Bike Name</label>
            <input type="bikename"
                placeholder='Enter bike name'
                className='block w-80 h-8 rounded-xl pl-2'
                onChange={(e) => setBikeName(e.target.value)}
                defaultValue={bikeName}
            />
            <label className='font-googleFont text-lg'>Bike Number</label>
            <input type="text"
                placeholder='Enter bike number'
                className='block w-80 h-8 rounded-xl pl-2'
                onChange={(e) => setBikeNo(e.target.value)}
                defaultValue={bikeNO}
            />
            <label className='font-googleFont text-lg'>Bike Location</label>
            <input type="text"
                placeholder='Enter location'
                className='block w-80 h-8 rounded-xl pl-2'
                onChange={(e) => setLocations(e.target.value)}
                defaultValue={locations}
            />
            <label className='font-googleFont text-lg'>Bike CC</label>
            <input type="number"
                placeholder='Enter bike CC'
                className='block w-80 h-8 rounded-xl pl-2'
                onChange={(e) => setBikeCC(e.target.value)}
                defaultValue={bikeCC}
            />
            <label className='font-googleFont text-lg'>Bike Rent</label>
            <input type="number"
                placeholder='Enter bike rent/hrs'
                className='block w-80 h-8 rounded-xl pl-2'
                onChange={(e) => setRent(e.target.value)}
                defaultValue={rent}
            />
            <label className='font-googleFont text-lg'>Bike type</label>
            <input type="text"
                placeholder='Enter type'
                className='block w-80 h-8 rounded-xl pl-2'
                onChange={(e) => setDetails(e.target.value)}
                defaultValue={details}
            />
            <label className='font-googleFont text-lg'>Details</label>
            <input type="text"
                placeholder='Enter bike details'
                className='block w-80 h-8 rounded-xl pl-2'
                onChange={(e) => setBikeType(e.target.value)}
                defaultValue={bikeType}
            />
            <label className='font-googleFont text-lg'>Add Image</label>
            <input
                type="file"
                name="image" 
                placeholder='Add images'
                className='block w-80 h-8 rounded-xl pl-2'
                accept="image/png, image/jpeg, image/jpg"
                multiple
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
  )
}

export default EditbikeOwner
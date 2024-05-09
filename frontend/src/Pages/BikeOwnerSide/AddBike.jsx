import { useState } from 'react'
import BikeOwnerSidebar from '../../Components/BikeOwnerSide/BikeOwnerSidebar'
import axios from '../../utils/axiosConfig'
import { toast } from 'react-toastify'
import { addBikeValidationSchema } from '../../FormValidation'
import { useNavigate } from 'react-router-dom'


function AddBike() {
    const [bikeName, setBikeName] = useState('')
    const [bikeNO, setBikeNo] = useState('')
    const [location, setLocation] = useState('')
    const [bikeCC, setBikeCC] = useState()
    const [rent, setRent] = useState()
    const [bikeType, setBikeType] = useState('')
    const [image, setImage] = useState([])
    const [details, setDetails] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addBikeValidationSchema.validate(
                { bikeName, bikeNO, location, rent, bikeType, bikeCC, details,image },
                { abortEarly: false }
            );
            const formData = new FormData()
            //formData.append("image" , image); 
            image.forEach((file) => {
                formData.append(`image`, file); 
            });
            formData.append("bikeName", bikeName);
            formData.append("bikeNO", bikeNO);
            formData.append("location", location);
            formData.append("rent", rent);
            formData.append("bikeType", bikeType);
            formData.append("bikeCC", bikeCC);
            formData.append("details", details);

            axios.post(`/bikeowner/addbike`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((result) => {
                    console.log(result);
                    toast.success('New bike added')
                    navigate('/bikeowner-bikedetails')
                })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.message) {
                        toast.error(err.response.data.message);
                    } else {
                        toast.error('An error occurred. Please try again later.');
                    }
                }) 
        } catch (error) {
            if (error.inner) {
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message; // Specific error messages
                });
                setErrors(newErrors);
            } else {
                console.error(error);
                toast.error('An error occurred. Please try again later.');
            }
        }

    }

    return (
        <div className="flex justify-center items-center">
            <BikeOwnerSidebar />
            <div className="bg-gray-200 w-full font-googleFont p-8 rounded-lg">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-6">ADD BIKE</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="bikeName" className="block text-sm font-semibold text-gray-700">
                                    Bike Name
                                </label>
                                <input
                                    type="text"
                                    id="bikeName"
                                    name="bikeName"
                                    placeholder="Enter bike name"
                                    className="input-field border border-gray-400 w-full pl-2"
                                    onChange={(e) => setBikeName(e.target.value)}
                                />
                                {errors.bikeName && (
                                    <div className="text-red-600 text-xs mb-2">{errors.bikeName}</div> // Dynamic error display
                                )}
                            </div>
                            <div>
                                <label htmlFor="bikeLocation" className="block text-sm font-semibold text-gray-700">Bike Location</label>
                                <input type="text"
                                    id="location"
                                    name='location'
                                    placeholder="Enter Bike location"
                                    className="input-field border border-gray-400 w-full pl-2"
                                    onChange={(e) => setBikeNo(e.target.value)}
                                />
                                {errors.location && <div className='text-red-600'>{errors.location}</div>}
                            </div>
                            <div>
                                <label htmlFor="bikeCC" className="block text-sm font-semibold text-gray-700">Bike CC</label>
                                <input type="number"
                                    id="bikeCC"
                                    name='bikeCC'
                                    placeholder="Enter bike cc"
                                    className="input-field border border-gray-400 w-full pl-2"
                                    onChange={(e) => setBikeCC(e.target.value)}
                                />
                                {errors.bikeCC && <div className='text-red-600'>{errors.bikeCC}</div>}

                            </div>
                            <div>
                                <label htmlFor="bikeNumber" className="block text-sm font-semibold text-gray-700">Bike Rent</label>
                                <input type="number"
                                    id="rent"
                                    name='rent'
                                    placeholder="Enter bike rent"
                                    className="input-field border border-gray-400 w-full pl-2"
                                    onChange={(e) => setRent(e.target.value)}
                                />
                                {errors.rent && <div className='text-red-600'>{errors.rent}</div>}

                            </div>
                            <div>
                                <label htmlFor="bikeNumber" className="block text-sm font-semibold text-gray-700">Bike Type</label>
                                <input type="text"
                                    id="bikeType"
                                    name='bikeType'
                                    placeholder="Enter bike type"
                                    className="input-field border border-gray-400 w-full pl-2"
                                    onChange={(e) => setBikeType(e.target.value)}
                                />
                                {errors.bikeType && <div className='text-red-600'>{errors.bikeType}</div>}

                            </div>
                            <div>
                                <label htmlFor="bikeNumber" className="block text-sm font-semibold text-gray-700">Bike Details</label>
                                <input type="text"
                                    id="details"
                                    name='details'
                                    placeholder="Enter bike details"
                                    className="input-field border border-gray-400 w-full pl-2"
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                                {errors.details && <div className='text-red-600'>{errors.details}</div>}

                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Bike Number</label>
                                <input type="text"
                                    id="bikeNO"
                                    name='bikeNO'
                                    placeholder="Enter bike number"
                                    className="input-field border border-gray-400 w-full pl-2"
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                {errors.bikeNO && <div className='text-red-600'>{errors.bikeNO}</div>}

                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Add Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    placeholder="Add images"
                                    className="input-field"
                                    accept="image/png, image/jpeg, image/jpg"
                                    multiple
                                    onChange={(e) => {
                                        console.log(e.target.files);
                                        const files = Array.from(e.target.files);
                                        setImage(files);
                                    }}
                                />
                                {errors.image && <div className='text-red-600'>{errors.image}</div>}

                            </div>
                        </div>

                        <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-75">
                            ADD BIKE
                        </button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default AddBike

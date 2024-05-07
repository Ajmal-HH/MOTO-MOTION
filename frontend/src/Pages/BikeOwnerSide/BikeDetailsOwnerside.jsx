import React, { useEffect, useState } from 'react'
import Adminsidebar from '../../Components/AdminSide/Adminsidebar'
import axios from '../../utils/axiosConfig'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom'


function BikeDetailsOwnerside() {
    const [bikes, setBikes] = useState([])


    useEffect(() => {
        axios.get(`/bikeowner/bike-list`)
            .then(response => {
                setBikes(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    },[]);

    const handleBlock = async (bikeId) => {
        try {
             axios.get(`/bikeowner/deletebike?id=${bikeId}`);
             const updatedBikes = bikes.map(bike => {
                if (bike._id === bikeId) {
                  return { ...bike, is_deleted: true };
                }
                return bike;
              });
              setBikes(updatedBikes);
            toast.error('Bike Deleted!');
        } catch (error) {
            console.error('Error in Delete bike:', error);
            toast.error('Failed to delete bike');
        }
    }

 
    return (
        <div className='w-full flex'>
            <Adminsidebar />
            <div className='flex flex-col flex-1 bg-gray-200 font-googleFont'>
                <h1 className='text-center text-2xl pt-3'>Bike List</h1>
                <Link to={'/adduser'} className='bg-blue-500 ml-4 w-32 h-6 rounded-md text-center'>ADD NEW BIKE</Link>
                <div className="overflow-x-auto mt-2">
                <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
            <th colSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        {bikes.map((bike, index) => (
            <tr key={bike._id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bike.bike_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bike.bike_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bike.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {/* <Link to={`/admin-loadedituser?bikeId=${bike._id}`} className='bg-gray-500 text-white px-2 py-1 rounded'>Edit</Link> */}
                    {bike.is_deleted ? (
                        <span  className="bg-gray-500 text-white px-2 py-1 rounded">
                            Edit
                        </span>
                    ) : (
                      <Link to={`/bikeowner-editbike?bikeId=${bike._id}`} className='bg-gray-500 text-white px-2 py-1 rounded'>Edit</Link>
                    )}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                    {bike.is_deleted ? (
                        <span className="bg-red-400 text-white px-2 py-1 rounded">Inactive</span>
                    ) : (
                        <span className="bg-green-500 text-white px-2 py-1 rounded">Active</span>
                    )}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                    {bike.is_deleted ? (
                        <span  className="bg-red-400 text-white font-bold py-2 px-4 rounded">
                            Deleted
                        </span>
                    ) : (
                        <button onClick={() => handleBlock(bike._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    )}
                </td>
            </tr>
        ))}
    </tbody>
</table>

                </div>
            </div>
        </div>
    )
}

export default BikeDetailsOwnerside;

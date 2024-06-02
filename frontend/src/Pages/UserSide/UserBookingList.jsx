import { useEffect, useState } from "react";
import Header from "../../Components/UserSide/Header";
import axios from '../../utils/axiosConfig';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function UserBookingList() {
  const [userBookingList, setUserBookingList] = useState([]);

  // Helper function to format date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const cancelBooking = (bookingId) => {
    try {
        axios.get(`/cancel-booking?bookingId=${bookingId}`)
        const updatedBookingList = userBookingList.map(booking => {
            if (booking._id === bookingId) {
                return { ...booking, booking_status : 'canceled' };
            }
            return booking;
        });
        setUserBookingList(updatedBookingList);
        toast.success('Booking Canceled!');
    } catch (error) {
        console.error('Error cancel booking:', error);
        toast.error('Failed to cancel booking');
    }
}

  useEffect(() => {
    axios.get('/user-bookinglist')
      .then((response) => {
        const data = response.data
        setUserBookingList(data.reverse());
      })
      .catch(() => {
        toast.error('Error in fetching booking details.');
      });
  }, []);

   // Pagination
   const [currentPage, setCurrentPage] = useState(1);
   const recordPerPage = 5;
   const lastIndex = currentPage * recordPerPage;
   const firstIndex = lastIndex - recordPerPage;
   const records = userBookingList.slice(firstIndex, lastIndex);
   const npage = Math.ceil(userBookingList.length / recordPerPage);
   const numbers = [...Array(npage + 1).keys()].slice(1);

   const prePage = () => {
       if (currentPage !== 1) {
           setCurrentPage(currentPage - 1);
       }
   };
   const changeCPage = (id) => {
       setCurrentPage(id);
   };
   const nextPage = () => {
       if (currentPage !== npage) {
           setCurrentPage(currentPage + 1);
       }
   };

  return (
    <div className="font-googleFont  bg-gray-200">
      <Header />
      <div className=' pt-24  ml-2  flex'>
        <Link to={'/userprofile'} className='bg-yellow-500 ml-4 w-32 h-6 rounded-md text-center'>&larr; Back</Link>
        </div>
      <div className="w-full min-h-screen mt-5">
        {userBookingList.length > 0 ? (
          records.map((booking, index) => (
            <div key={index} className="w-12/12 m-5 border border-gray-400 h-52 rounded-xl flex bg-white">
              <div className="w-60 h-[180px] rounded-md mt-3 ml-3 object-cover bg-pink-300">
                {booking && booking.bike.image && booking.bike?.image.length > 0 && <img src={`${booking.bike.image[0]}`} className="object-cover w-full h-full rounded-lg " alt="Bike Image" />
                }
              </div>
              {/* <img src={booking.bike.image} alt={booking.bike.name} className="w-60 h-full rounded-md ml-2 object-cover bg-pink-300" /> */}
              <div className="flex flex-col ml-10 justify-center">
                <div>
                  <p className="font-semibold text-xl">{booking.bike.bike_name}</p>
                  <p className="text-gray-500">{booking.bike.details}</p>
                </div>
                <div className="flex mt-2">
                  <p>Booking Date: <span className="pr-5">{formatDate(booking.pickup_date)}</span> to <span className="pl-5">{formatDate(booking.dropoff_date)}</span></p>
                </div>
                <p className="mt-2">PickUp Location: {booking.bike.location}</p>
                <p className="mt-2">Booking status: {booking.booking_status}</p>
              </div>
                {/* <div className="rounded-lg w-full h-7 flex justify-center items-center mt-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer">
                  <h1>Cancel Booking</h1>
                </div> */}
             <div className="w-40 h-full mr-10 ml-auto flex justify-center items-center">
  {booking && booking.booking_status === 'canceled' ? (
    <div className='rounded-lg w-full h-7 flex justify-center items-center mt-2 border border-red-300 text-red-400 hover:bg-red-300 hover:text-white'>
      <h1>Canceled</h1>
    </div>
  ) : (
    booking && booking.booking_status === 'confirmed' ? (
      <div onClick={() => cancelBooking(booking._id)} className='rounded-lg w-full h-7 flex justify-center items-center mt-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>
        <h1>Cancel</h1>
      </div>
    ) : (
      <div className='rounded-lg w-full h-7 flex justify-center items-center mt-2 border border-yellow-500  hover:bg-yellow-300 '>
        <h1>{booking.booking_status}</h1>
      </div>
    )
  )}
</div>

            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-screen bg-white">
            <p className="text-gray-600 text-lg font-semibold">No bookings available</p>
            <p className="text-gray-500 mt-2">You have no current bookings. Book a bike to get started!</p>
            <Link to={'/bikes'} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Book Now
            </Link>
          </div>
        )}
      <nav className="mt-4 flex justify-center">
                        <ul className="pagination flex">
                            <li className="page-item">
                                <button onClick={prePage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l">
                                    Prev
                                </button>
                            </li>
                            {numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <button onClick={() => changeCPage(n)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                                        {n}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button onClick={nextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
      </div>
    </div>
  );
}

export default UserBookingList;

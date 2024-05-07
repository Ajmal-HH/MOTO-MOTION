import React from 'react'
import { Link } from 'react-router-dom'
function BikeOwnerSidebar() {
  return (
    <div className='w-60  min-h-screen font-bold bg-purple-500'>
    <div className='flex flex-col pt-24 pl-14'>
    <Link className='pt-5 '>DASHBOARD</Link>
    <Link to={'/bikeowner-details'} className='pt-5 '>DETAILS</Link>
    <Link to={'/bikeowner-bikedetails'} className='pt-5 '>BIKE DETAILS</Link>
    <Link className='pt-5 '>BOOKINGS</Link>
    <Link className='pt-5 '>CHATS</Link>
</div>
</div>
  )
}

export default BikeOwnerSidebar

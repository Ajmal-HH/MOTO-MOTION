import { Link } from 'react-router-dom'

function Adminsidebar() {
  return (
    <div className='w-60  min-h-screen font-bold bg-purple-500'>
    <div className='flex flex-col pt-24 pl-14'>
    <Link className='pt-5 '>DASHBOARD</Link>
    <Link to={'/user-list'} className='pt-5 '>USERS</Link>
    <Link to={'/bike-owners'} className='pt-5 '>BIKE OWNERS</Link>
    <Link className='pt-5 '>BIKES</Link>
    <Link className='pt-5 '>COUPONS</Link>
</div>
</div>
  )
}

export default Adminsidebar

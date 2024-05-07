
import AdminDashboard from './Pages/AdminSide/AdminDashboard'
import AdminLogin from './Pages/AdminSide/AdminLogin'
import UserList from './Pages/AdminSide/UserList'
import AddBike from './Pages/BikeOwnerSide/AddBike'
import BikeOwnerDashboard from './Pages/BikeOwnerSide/BikeOwnerDashboard'
import BikeOwnerDetails from './Pages/BikeOwnerSide/BikeOwnerDetails'
import BikeOwnerLogin from './Pages/BikeOwnerSide/BikeOwnerLogin'
import BikeOwnerSignup from './Pages/BikeOwnerSide/BikeOwnerSignup'
import BikeOwners from './Pages/AdminSide/BikeOwners'
import Bikes from './Pages/UserSide/Bikes'
import Homepage from './Pages/UserSide/Homepage'
import Login from './Pages/UserSide/Login'
import OTPpage from './Pages/UserSide/OTPpage'
import Register from './Pages/UserSide/Register'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
//import { Toaster } from 'sonner'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import BikeDetails from './Pages/UserSide/BikeDetails'
import AddUser from './Pages/AdminSide/AddUser'
import AdminEdituser from './Pages/AdminSide/AdminEdituser'
import AddOwner from './Pages/AdminSide/AddOwner'
import AdminEditOwner from './Pages/AdminSide/AdminEditOwner'
import BikeDetailsOwnerside from './Pages/BikeOwnerSide/BikeDetailsOwnerside'
import EditbikeOwner from './Pages/BikeOwnerSide/EditbikeOwner'
import UserProfile from './Pages/UserSide/UserProfile'
import EditUser from './Pages/UserSide/EditUser'
import UserDetails from './Pages/AdminSide/UserDetails'

function App() {
  return (
    <>
    {/* <Toaster/> */}
    <ToastContainer />
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/otp' element={<OTPpage />} />
        <Route path='/bikes' element={<Bikes />} ></Route>
        <Route path='/bike-details' element={<BikeDetails />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/edit-user' element={<EditUser />} />


        <Route path='/bikeowner-signup' element={<BikeOwnerSignup />} />
        <Route path='/bikeowner-login' element={<BikeOwnerLogin />} />
        <Route path='/bikeowner-dashboard' element={<BikeOwnerDashboard />} />
        <Route path='/addbike' element={<AddBike />} />
        <Route path='/bikeowner-details' element={<BikeOwnerDetails />} />
        <Route path='/bikeowner-bikedetails' element={<BikeDetailsOwnerside />}/>
        <Route path='/bikeowner-editbike' element={<EditbikeOwner />} />


       <Route path='/admin' element={<AdminLogin />} />
       <Route path='/admin-dashboard' element={<AdminDashboard />} />
       <Route path='/user-list' element={<UserList /> } />
       <Route path='/user-details' element={<UserDetails />} />
       <Route path='/bike-owners' element={<BikeOwners />} />
       <Route path='/adduser' element={<AddUser />} />
       <Route path='/admin-loadedituser' element={<AdminEdituser />} />
       <Route path='/addowner' element={<AddOwner />} />
       <Route path='/admin-loadeditowner' element={<AdminEditOwner />} />
       
      </Routes>
    </Router>   
    </>
  )
}

export default App

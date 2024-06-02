import  { useEffect, useState } from 'react'
import Adminsidebar from '../../Components/AdminSide/Adminsidebar'
import axios from '../../utils/axiosConfig'
import { Link, useNavigate } from 'react-router-dom'


function VerifyUserDocument() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate() 

    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const recordPerPage = 5
    const lastIndex = currentPage * recordPerPage
    const firstIndex = lastIndex - recordPerPage
    const records = users.slice(firstIndex, lastIndex)
    const npage = Math.ceil(users.length / recordPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)


    useEffect(() => {
        axios.get(`/admin/verfiy-document-list`)
            .then(response => {
                setUsers(response.data);
                //console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    },[navigate]);



    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const changeCPage = (id) => {
        setCurrentPage(id)
    }
    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
  return (
    <div className='w-full flex'>
    <Adminsidebar />
    <div className='flex flex-col flex-1 bg-gray-200 font-googleFont'>
        <h1 className='text-center text-2xl pt-3'>Customers</h1>
        <div className='flex'>
        <Link to={'/user-list'} className='bg-blue-500 ml-4 w-32 h-6 rounded-md text-center'>&larr; Back</Link>
        </div>
        <div className="overflow-x-auto mt-2">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th colSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {records.map((user, index) => (
                        <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{(currentPage - 1) * recordPerPage + index + 1}</td>
                            <Link to={`/user-details?userId=${user._id}`}><td className="px-6 py-4 whitespace-nowrap">{user.name}</td></Link>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                           
                            <td className="px-6 py-4 whitespace-nowrap">
                                {user.isBlocked ? (
                                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Inactive</span>
                                ) : (
                                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">{user.account_status}</span>
                                    ) 
                                }
                            </td>


                            <td className="px-6 py-4 whitespace-nowrap">
  <Link 
    to={`/user-details?userId=${user._id}`} 
    className='w-40 h-7 bg-green-500 text-white  rounded-md flex items-center justify-center hover:bg-green-600 transition-colors duration-200'
  >
    VERIFY DOCUMENT
  </Link>
</td>

                        </tr>
                    ))}
                </tbody>
            </table>
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
</div>
  )
}

export default VerifyUserDocument

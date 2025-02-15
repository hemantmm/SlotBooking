import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"

function ProfileDropdown() {
    const navigate=useNavigate()

    const [isOpen, setIsOpen] = useState(false)

    const profileNavigate=()=>{
        navigate("/profile")
    }

    const handleLogout=()=>{
        localStorage.removeItem("user")
        // window.location.reload()
        navigate("/")
    }

  return (
    // <div>ProfileDropdown</div>
    <div>
        <div className='relative'>
            <button className='bg-white text-purple-500 font-bold text-lg p-2 rounded-lg shadow-md border-none' onClick={()=>setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

            </button>
            {isOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1'>
                    {/* <a href='/profile' className='block px-4 py-2 text-sm text-gray-700 hover:bg-purple-500 hover:text-white'>Profile</a> */}
                    <span className='block px-4 py-2 text-sm text-gray-700 hover:bg-purple-500 hover:text-white cursor-pointer' onClick={profileNavigate}>Profile</span>
                    {/* <span className='block px-4 py-2 text-sm text-gray-700 hover:bg-purple-500 hover:text-white cursor-pointer' onClick={handleLogout}>Logout</span> */}
                </div>
                
            )}
        </div>
        
    </div>
  )
}

export default ProfileDropdown
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
    const navigate=useNavigate()
    const [user,setUser]=useState({name:"",email:""})

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"))
        if(user){
            setUser(user)
        }
    },[])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-purple-600'>
        <div className='rounded-lg p-6 w-full max-w-3xl bg-purple-400'>
            <h2 className='text-2xl font-bold text-center mb-4 text-white'>Welcome to Profile Page</h2>
            <div>
                <h3 className="text-xl font-semibold mb-4 text-center text-white">Name: {user.name}</h3>
            </div>
            <div className='mt-4'>
                <h3 className="text-xl font-semibold mb-4 text-center text-white">Email: {user.email}</h3>
            </div>
            <div className='mt-4'>
                <button className='w-full bg-white text-purple-500 font-bold text-lg p-2 rounded-lg shadow-md' onClick={()=>navigate("/slot")}>Slot Management Page</button>
            </div>
        </div>
    </div>
  )
}

export default UserProfile
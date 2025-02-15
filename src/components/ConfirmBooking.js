import React, {useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"

function ConfirmBooking() {
    const navigate=useNavigate()
    const [selectedSlot,setSelectedSlot]=useState({date:"",time:""})

    useEffect(()=>{
        const slot=JSON.parse(localStorage.getItem("selectedSlot"))
        if(slot){
            setSelectedSlot(slot)
        }
    },[])

    const handleConfirm=()=>{
        const {date,time}=selectedSlot
        const bookedSlots=JSON.parse(localStorage.getItem("bookedSlots")) || {}
        bookedSlots[date]=bookedSlots[date] || []
        bookedSlots[date].push(time)
        localStorage.setItem("bookedSlots", JSON.stringify(bookedSlots))
        localStorage.removeItem("selectedSlot")
        alert("Booking confirmed")
        navigate("/calendar")
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-purple-600'>
    <div className='rounded-lg p-6 w-full max-w-3xl bg-purple-400'>
        <h2 className='text-2xl font-bold text-center mb-4 text-white'>Confirm your booking</h2>
        <div>
            <h3 className="text-xl font-semibold mb-4 text-center text-white">You have selected: {selectedSlot.time} on {selectedSlot.date}</h3>
        </div>
        <div className='mt-4'>
            <button className='w-full bg-white text-purple-500 font-bold text-lg p-2 rounded-lg shadow-md' onClick={handleConfirm}>Confirm Booking</button>
        </div>
    </div>
</div>
  )
}

export default ConfirmBooking
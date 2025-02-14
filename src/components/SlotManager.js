import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"

const days=["MON","TUE","WED","THU","FRI","SAT","SUN"]

const defaultAvailability = {
    MON: {start: "09:00", end: "17:00", enabled: true},
    TUE: {start: "09:00", end: "17:00", enabled: true},
    WED: {start: "09:00", end: "17:00", enabled: true},
    THU: {start: "09:00", end: "17:00", enabled: true},
    FRI: {start: "09:00", end: "17:00", enabled: true},
    SAT: {start: "", end: "", enabled: false},
    SUN: {start: "", end: "", enabled: false}
}

function SlotManager() {
    const navigate=useNavigate()
    const [availability, setAvailability] = useState(()=>{
        const savedAvailability=localStorage.getItem("availability")
        return savedAvailability ? JSON.parse(savedAvailability) : defaultAvailability
    })

    const handleSave=()=>{
        localStorage.setItem("availability", JSON.stringify(availability))
        window.dispatchEvent(new Event("storage"))
        navigate("/calendar")
    }

    const updateAvailability=(day, field, value)=>{
        setAvailability((prev)=>({
            ...prev,
            [day]:{
                ...prev[day],
                [field]:value
            }   
        }))
    }
  return (
    <div className='flex flex-col items-center min-h-screen p-6 bg-purple-600'>
        <div className='rounded-lg p-6 w-full max-w-3xl bg-purple-400'>
            <h2 className='text-2xl font-bold text-center mb-4 text-white'>Manage Weekly UnAvailability</h2>
            <div className='space-y-4'>
                {days.map((day)=>(
                    <div key={day} className='flex flex-wrap items-center justify-between p-4 rounded-lg'>
                        <div className='flex items-center space-x-3'>
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input type='checkbox' checked={availability[day].enabled} onChange={(e)=>updateAvailability(day,"enabled",e.target.checked)} />
                            </label>
                            <span className='text-lg font-medium text-white pl-5'>
                                {day}
                            </span>
                            </div>
                            {availability[day].enabled && (
                                <div className='flex space-x-3'>
                                    <input type='time' value={availability[day].start} onChange={(e)=>updateAvailability(day,"start",e.target.value)} className='border rounded-lg p-2 text-sm sm:text-base md:text-lg lg:text-xl' />
                                    <span className='p-2'>-</span>
                                    <input type='time' value={availability[day].end} onChange={(e)=>updateAvailability(day,"end",e.target.value)} className='border rounded-lg p-2 text-sm sm:text-base md:text-lg lg:text-xl' />
                                    </div>
                            )}
                            </div>
                ))}
            </div>
            <button className='w-full text-purple-400 font-bold mt-6 py-3 bg-white rounded-lg flex justify-center' onClick={handleSave}>
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 pr-2"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                    />
                </svg>
                Save & proceed to calendar
            </button>
        </div>
    </div>
  )
}

export default SlotManager
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate=useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')  
    const [error, setError] = useState('')

    const handleChange = () => {
        if(name === '' || email === '') {
            setError('Please fill in all the fields')
        } else {
            // localStorage.setItem('name', name)
            // localStorage.setItem('email', email)
            localStorage.setItem("user",JSON.stringify({name,email}))
            navigate('/slot')
        }
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-purple-600'>
        <div className='rounded-lg p-6 w-full max-w-3xl bg-purple-400'>
            <h2 className='text-2xl font-bold text-center mb-4 text-white'>Welcome to the Slot-Booking page</h2>
            {<p className='text-red-600 text-center font-medium'>{error}</p>}
            <div>
                <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' className='border rounded-lg p-2 text-purple-500 text-sm sm:text-base md:text-lg lg:text-xl w-full' required />
            </div>
            <div className='mt-4'>
                <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' className='border rounded-lg p-2 text-purple-500 text-sm sm:text-base md:text-lg lg:text-xl w-full' />
            </div>
            <div className='mt-4'>
                <button className='w-full bg-white text-purple-500 font-bold text-lg p-2 rounded-lg shadow-md' onClick={handleChange}>Login</button>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
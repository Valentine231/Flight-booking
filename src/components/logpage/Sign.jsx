import React, { useState } from 'react'
import useAuth from '../../Store/Auth'
import {ClipLoader} from 'react-spinners'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Sign = () => {
  const {signup,loading,error} = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    await signup({email,password})
    navigate('/login')

  }
  return (
    <div>
       <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          {loading ? <ClipLoader color="#fff" size={20} />  : "Sign Up"}
        </button>
          
        {error && <p className=" ml-5 text-center text-red-500 text-sm mt-2">{error}</p>}

        <motion.p 
          className="mt-4 text-center text-sm cursor-pointer text-blue-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSignup(false)}
        >
          Already have an account? Login
        </motion.p>
      </div>
    </motion.div>
    </div>
  )
}

export default Sign;
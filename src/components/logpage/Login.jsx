import React, { useState } from 'react'
import useAuth from '../../Store/Auth'
import { ClipLoader } from 'react-spinners'
import { motion } from 'framer-motion'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
  const {login,loading,error} = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
   await login({email,password})
   navigate('/Searchform')
  }
  return (
    <div>  
      <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
       
        <input
          type="text"
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
          onClick={handleLogin}
          disabled={loading}
          className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : "Login"}
        </button>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <Link
          className="mt-5 ml-5 text-center text-sm cursor-pointer text-blue-500"
         to={'/Sign'}
        >
          Don't have an account? Sign up
        </Link>
      </div>
    </motion.div>
    </div>
  )
}

export default Login;
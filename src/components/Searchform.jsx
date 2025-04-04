import React, { useState } from 'react'
import useflightstore from '../Store/Searchflight'
import Flightlist from './Flightlist'

const Searchform = () => {
    const {search} = useflightstore();
    const [origin,setOrigin] = useState("");
    const [destination,setDestination] = useState("");
    const [date, setDate]=useState("")

    const handlesearch = (e) => {
        e.preventDefault();
        search(origin,destination,date);
    }
  return (
    <div className=' w-full flex flex-row'>
        <section className='w-1/2 min-h-screen bg-blue-400 '>
        <form 
        className='flex flex-col p-4 w-[50%] justify-center items-center mt-15 ml-10 bg-white rounded-lg focus:visible:indigo-500'
        onSubmit={handlesearch}>
            <h2 className='text-center text-2xl text-gray-900'>Search Flight</h2>
        <input
                type="text"
                placeholder="Origin (e.g., JFK)"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="border p-2 w-1/2 mb-2 focus-visible:none focus-ring:bg-indigo-500"
            />
            <input
                type="text"
                placeholder="Destination (e.g., LAX)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border p-2 w-1/2 mb-2 focus-visible:none focus-ring:bg-indigo-500"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 w-1/2 focus-visible:none focus-ring:bg-indigo-500 "
            />
            <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-lg w-1/2 mt-3">
                Search Flights
            </button>
        </form>

        
        </section>

        <section>
        <Flightlist />
        </section>
    </div>
  )
}

export default Searchform
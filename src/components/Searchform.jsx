import React, { useState } from 'react'
import useflightstore from '../Store/Searchflight'
import Flightlist from './Flightlist'

const Searchform = () => {
    const {search} = useflightstore();
    const [origin,setOrigin] = useState("");
    
    const [destination,setDestination] = useState("");
    const [date, setDate]=useState("")
    const [showFlightlist, setShowFlightlist] = useState(false);

    const handlesearch = (e) => {
        e.preventDefault();
        search(origin,destination,date);
        search(origin, destination, date);
        if (window.innerWidth < 768) { // Tailwind's md breakpoint
            setShowFlightlist(true);
        }
    }
  return (
    <div className='w-full flex flex-col md:flex-row'>
    {/* Search Form */}
    <section className={`w-full  md:w-1/2 min-h-screen bg-blue-950 relative ${showFlightlist && 'hidden md:block'}`}>
        <form 
            className='flex flex-col p-6 w-[80%] mr-12   md:w-[30%] justify-center left-11  items-center mx-auto mt-43 bg-white rounded-lg fixed '
            onSubmit={handlesearch}
        >
            <h2 className='text-center text-2xl text-gray-950'>Search Flight</h2>
            <input
                type="text"
                placeholder="Origin (e.g., JFK)"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <input
                type="text"
                placeholder="Destination (e.g., LAX)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 w-full"
            />
            <button type='submit' className="bg-blue-950 text-white px-4 py-2 rounded-lg w-full mt-3 cursor-pointer">
                Search Flights
            </button>
        </form>
    </section>

    {/* Flight List */}
    <section className={`w-full md:w-1/2 ${!showFlightlist ? 'hidden md:block' : 'block'}`}>
        {/* Mobile back button */}
        {showFlightlist && (
            <div className="md:hidden p-2">
                <button
                    onClick={() => setShowFlightlist(false)}
                    className="text-blue-600 underline"
                >
                    ← Back to Form
                </button>
            </div>
        )}
        <Flightlist />
    </section>
</div>

  )
}

export default Searchform
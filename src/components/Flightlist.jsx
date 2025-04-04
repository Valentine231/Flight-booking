import { useState } from "react";
import useFlightStore from "../Store/Searchflight";
import useBookingStore from "../Store/Bookingstore";
import useAuth from "../Store/Auth";
import { useNavigate } from "react-router-dom";

const FlightList = () => {
  const {user,loading:Loading} =useAuth()
  const { flights, loading, error } = useFlightStore();
  const { setSelectedFlight } = useBookingStore();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  if(Loading) return <p className="text-center">Loading...</p>;
  if(!user) return <p className="text-center">Please log in to view flights.</p>;


  const handleFlightSelect = (flight, index) => {
    if(Loading) return <p className="text-center">Loading...</p>;
    if(!user) return <p className="text-center">Please log in to view flights.</p>;
    setSelectedFlight(flight);
    setSelectedIndex(index);
    navigate('/passenger');
  };

  if (loading) return <p className="text-center">Loading flights...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="mt-4 max-w-4xl items-center mr-6 ">
      <h2 className="text-2xl font-bold mb-6 text-center ">Available Flights</h2>
      
      {flights.map((flight, index) => {
        const segment = flight.itineraries[0].segments[0];
        const airline =  segment.airline || "Unknown Airline";
        const flightNumber = segment.number || "";
        
        return (
          <div
            key={`${flight.id}-${index}`}
            className={`border p-6 mb-4 rounded-lg shadow-md cursor-pointer transition-all ${
              selectedIndex === index 
                ? "bg-blue-50 border-blue-500 ring-2 ring-blue-300" 
                : "hover:bg-gray-50"
            }`}
            onClick={() => handleFlightSelect(flight, index)}
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Flight Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <span className="font-semibold text-blue-600">{airline}</span>
                  </div>
                  <span className="text-sm text-gray-500">Flight {flightNumber}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{segment.departure.iataCode}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(segment.departure.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  <div className="flex-1 relative">
                    <div className="h-px bg-gray-300 w-full absolute top-1/2"></div>
                    <div className="text-xs text-center text-gray-500 mt-6">
                      {flight.itineraries[0].duration.replace(/PT|H|M/g, ' ').trim()}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold">{segment.arrival.iataCode}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(segment.arrival.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Price and Select */}
              <div className="flex flex-col items-end justify-between">
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  ${flight.price.total}
                </p>
                <button 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFlightSelect(flight, index);
                  }}
                >
                  Select Flight
                </button>
              </div>
            </div>
            
            {/* Airport Details */}
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Departure Airport:</p>
                <p className="text-gray-600">{segment.departure.iataCode} - {segment.departure.terminal ? `Terminal ${segment.departure.terminal}` : ''}</p>
              </div>
              <div>
                <p className="font-medium">Arrival Airport:</p>
                <p className="text-gray-600">{segment.arrival.iataCode} - {segment.arrival.terminal ? `Terminal ${segment.arrival.terminal}` : ''}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlightList;
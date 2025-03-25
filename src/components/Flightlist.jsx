import { useState } from "react";
import Useflightstore from "../Store/Searchflight"

const FlightList = () => {
  const { flights, loading, error } = Useflightstore();
  const [selectedFlight, setSelectedFlight] = useState(null);

  if (loading) return <p className="text-center">Loading flights...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="mt-4">
      {flights.map((flight, index) => (
        <div
          key={index}
          className="border p-4 mb-2 rounded shadow cursor-pointer flex flex-col-2 gap-2 m-3"
          onClick={() => setSelectedFlight(flight)}
        >
          <h3 className="text-lg font-semibold">
            {flight.itineraries[0].segments[0].departure.iataCode} →
            {flight.itineraries[0].segments[0].arrival.iataCode}
          </h3>
          <p>Price: ${flight.price.total}</p>
          <p>Duration: {flight.itineraries[0].duration}</p>
          {/* <p>Airport:{flight.itineraries.airport}</p> */}
        </div>
      ))}

      {/* Show the map only when a flight is selected */}
      {/* {selectedFlight && <Map flight={selectedFlight} />} */}
    </div>
  );
};

export default FlightList;

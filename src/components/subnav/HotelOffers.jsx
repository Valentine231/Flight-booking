import { useEffect, useState } from 'react';
import axios from 'axios';


const Hoteloffers =()=> {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchhotel = async () => {
      try {
        const responses = await axios.get('http://localhost:5000/api/hotels');
        setHotels(responses.data.data);
       
      } catch (error) {
        console.error("Error fetching flight offers:", error);
        console.log("Full error response:", error.response?.data || error);
        throw error;
      }
    };

    fetchhotel();

  }, []);

  return (
    <div className="grid gap-4 p-4">
  {hotels.map((hotel, index) => {
    const hotelInfo = hotel.hotel || {};
    const address = hotelInfo.address || {};
    const lines = address.lines || [];
    const city = address.cityName || 'Unknown City';
    const offer = hotel.offers?.[0];

    return (
      <div key={hotelInfo.hotelId || index} className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold">{hotelInfo.name || 'Unnamed Hotel'}</h2>
        <p>{lines.join(', ')}, {city}</p>
        <p>
          Price: {offer?.price?.total || 'N/A'} {offer?.price?.currency || ''}
        </p>
        <p>
          Room Type: {offer?.room?.typeEstimated?.category || 'N/A'}
        </p>
      </div>
    );
  })}
</div>

  );
}

export default Hoteloffers 
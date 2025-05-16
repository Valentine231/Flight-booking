const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

app.get('/api/hotels', async (req, res) => {
  const { cityCode = 'LON', checkInDate = '2025-06-15', checkOutDate = '2025-06-18' } = req.query;

  try {
    console.log('Fetching Amadeus token...');
    const tokenResponse = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const access_token = tokenResponse.data.access_token;

    console.log(`Fetching hotel IDs for city ${cityCode}...`);
    const hotelsRes = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const hotelIds = hotelsRes.data.data
      .map((hotel) => hotel.hotelId)
      .slice(0, 5)
      .join(',');

    if (!hotelIds) {
      return res.status(404).json({ error: 'No hotel IDs found for this city.' });
    }

    console.log(`Fetching offers for hotelIds: ${hotelIds}`);
    const offersRes = await axios.get(
      `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelIds}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=1`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      }
    );

    res.json({ data: offersRes.data.data });
  } catch (error) {
    console.error('Error fetching hotel offers:', error.message);
    console.error('Full error response:', error.response?.data || error);
    res.status(500).json({ error: 'Failed to fetch hotel offers' });
  }
});

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));

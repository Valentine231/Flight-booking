import Amadeus from 'amadeus';

const amadeus = new Amadeus({ 
    clientId: import.meta.env.VITE_AMADEUS_API_KEY,
    clientSecret: import.meta.env.VITE_AMADEUS_API_SECRET
});

export default amadeus;
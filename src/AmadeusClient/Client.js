import axios from "axios";

export const useFlightSearch = async (origin, destination, date) => {
    try {
        // 1️⃣ Get Access Token
        const tokenResponse = await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token", 
            new URLSearchParams({
                grant_type: "client_credentials",
                client_id: import.meta.env.VITE_AMADEUS_API_KEY,
                client_secret: import.meta.env.VITE_AMADEUS_API_SECRET
            }), 
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const access_token = tokenResponse.data.access_token;

        // 2️⃣ Get Flight Offers
        const response = await axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            params: {
                originLocationCode: origin,
                destinationLocationCode: destination,
                departureDate: date,
                adults: 1,
                currencyCode: "USD",
            }
        });

        return response.data.data;
    } catch (error) {
        console.error("Error fetching flight offers:", error);
        throw error;
    }
};

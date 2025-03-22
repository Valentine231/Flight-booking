import amadeus from "../AmadeusClient/Client";

export const useFlightSearch =  async (origin, destination, date) => {
    try {
        const response = await amadeus.shopping.flightOffers.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: date,
            adults: 1,
            currencyCode: "USD",
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching flight offers:", error);
        throw error;
    }
};
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import { useEffect, useState } from "react";
// import L from "leaflet";

// const FlightMap = ({ flight }) => {
//   const [mapCenter, setMapCenter] = useState([0,0]); // Default center

//   useEffect(() => {
//     if (flight) {
//       const departureCoords = [
//         flight.itineraries[0].segments[0].departure.lat,
//         flight.itineraries[0].segments[0].departure.lon,
//       ];
//       setMapCenter(departureCoords);
//     }
//   }, [flight]);

//   if (!flight) return <p className="text-center">No flight selected</p>;

//   const departure = flight.itineraries[0].segments[0].departure;
//   const arrival = flight.itineraries[0].segments[0].arrival;

//   // Custom Leaflet Icon for Airports
//   const airportIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//     iconSize: [25, 25],
//   });

//   // Polyline path (flight route)
//   const flightPath = [
//     [departure.lat, departure.lon], 
//     [arrival.lat, arrival.lon]
//   ];

//   return (
//     <MapContainer center={mapCenter} zoom={4} style={{ height: "400px", width: "100%" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
//       {/* Departure Marker */}
//       <Marker position={[departure.lat, departure.lon]} icon={airportIcon}>
//         <Popup>Departure: {departure.iataCode}</Popup>
//       </Marker>

//       {/* Arrival Marker */}
//       <Marker position={[arrival.lat, arrival.lon]} icon={airportIcon}>
//         <Popup>Arrival: {arrival.iataCode}</Popup>
//       </Marker>

//       {/* Flight Route Line */}
//       <Polyline positions={flightPath} color="blue" />
//     </MapContainer>
//   );
// };

// export default FlightMap;

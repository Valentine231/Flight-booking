# React + Vite

Flight Booking Application

Overview
This Flight Booking Application is a React-based web application that allows users to search for flights, book tickets, and manage their bookings. The application features a user-friendly interface, secure authentication, and payment processing capabilities. It is designed to provide a seamless experience for travelers looking to book flights online.

Table of Contents
Features
Technologies Used
Installation
Usage
Components
State Management
Authentication
Payment Processing
Contributing
License
Contact
Features
Flight Search: Users can search for flights based on origin, destination, and date.
Flight Selection: Users can view available flights and select their preferred option.
Passenger Management: Users can add, update, and remove passenger details.
Booking Confirmation: Users can confirm their bookings and proceed to payment.
Secure Payments: Integration with Flutterwave for secure payment processing.
User Authentication: Users can sign up, log in, and manage their accounts.
Technologies Used
React: For building the user interface.
Zustand: For state management.
Supabase: For backend services including authentication and database management.
Flutterwave: For payment processing.
Tailwind CSS: For styling the application.
Installation
To set up the project locally, follow these steps:

Clone the repository:

bash
Run
Copy code
git clone https://github.com/yourusername/flight-booking-app.git
Navigate to the project directory:

bash
Run
Copy code
cd flight-booking-app
Install the dependencies:

bash
Run
Copy code
npm install
Start the development server:

bash
Run
Copy code
npm start
Open your browser and navigate to http://localhost:3000 to view the application.

Usage
Search for Flights: Enter the origin, destination, and travel date in the search form.
Select a Flight: Browse through the list of available flights and select one to proceed.
Add Passenger Details: Fill in the required passenger information.
Confirm Booking: Review the booking summary and confirm the booking.
Proceed to Payment: Complete the payment process using the integrated payment gateway.
Components
Homepage
The main landing page that includes:

Navbar: Navigation links to different sections of the application.
Hero Section: A video background with a welcome message and a "Book Now" button.
Destination Cards: Highlighting popular travel destinations.
Features Section: Showcasing the benefits of booking with the application.
Testimonials Section: Displaying customer reviews.
SearchForm
A component that allows users to input their flight search criteria (origin, destination, date).

FlightList
Displays the list of available flights based on the user's search criteria. Users can select a flight to proceed with booking.

Passenger
A component for managing passenger details, including adding new passengers and confirming the booking.

Payment
Handles the payment process using Flutterwave, allowing users to complete their bookings securely.

State Management
The application uses Zustand for state management, which provides a simple and efficient way to manage global state across components. Key stores include:

useAuth: Manages user authentication state.
useBookingStore: Manages flight selection, passenger details, and booking steps.
Useflightstore: Manages flight search results and loading states.
Authentication
The application uses Supabase for user authentication, allowing users to sign up, log in, and manage their sessions. The authentication flow includes:

Sign Up: Users can create a new account.
Login: Users can log in to their existing accounts.
Session Management: The application maintains user sessions and handles authentication state changes.
Payment Processing
The application integrates with Flutterwave for secure payment processing. Users can complete their bookings by providing payment information, which is securely handled by the Flutterwave API.

Contributing
Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for more details.



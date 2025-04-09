import Homepage from './components/Homepage.jsx'
import Checkin from './components/Checkin.jsx'
import Deals from './components/Deals.jsx'
import Flight from './components/Flight.jsx'
import MyTrip from './components/MyTrip.jsx'
import Support from './components/Support.jsx'
import Sign from './components/logpage/Sign.jsx'
import Login from './components/logpage/Login.jsx'

import CancelBooking from './components/subnav/CancelBooking.jsx'
import FlightDiscounts from './components/subnav/FlightDiscounts.jsx'
import HotelOffers from './components/subnav/HotelOffers.jsx'
import ModifyBooking from './components/subnav/ModifyBooking.jsx'
import UpcomingTrip from './components/subnav/UpcomingTrip.jsx'

import Searchform from './components/Searchform.jsx'
import Passenger from './components/Passenger.jsx'

//payment route
import Paymentpage from './components/Paymentpage.jsx'

import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import "leaflet/dist/leaflet.css";




const router = createBrowserRouter([
  
  {
    path:'/',

    element:<Homepage />,
    
  },
  {
    path:'/Checkin',

    element:<Checkin />,
  },
  {
    path:'/Deals',

    element:<Deals/>,
  },
  {
    path:'/Flight',

    element:<Flight />,
  },
  {
    path:'/MyTrip',

    element:<MyTrip />,
  },
  {
    path:'/Support',

    element:<Support />,
  },
  {
    path:'/Sign',

    element:<Sign />,
  },
  {
    path:'/Login',

    element:<Login />,
  },

  {
    path:'/UpcomingTrip',

    element:<UpcomingTrip />,
  },
  {
    path:'/ModifyBooking',

    element:<ModifyBooking />,
  },
  {
    path:'/CancelBooking',

    element:<CancelBooking />,
  },
  {
    path:'/FlightDiscounts',

    element:<FlightDiscounts />,
  },
   {
    path:'/HotelOffers',

    element:<HotelOffers />,
  },
  {
    path:'/Searchform',
    element:<Searchform />
  },
  {
    path:'/passenger',
    element:<Passenger />
  },
  {
    path:'/paymentroute',
    element:<Paymentpage />
  },


  

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>

  </StrictMode>,
)

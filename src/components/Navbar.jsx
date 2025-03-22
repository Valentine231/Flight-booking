import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaUserCircle, FaBars, FaTimes, FaSearch } from "react-icons/fa"; 
import { motion } from "framer-motion"; 
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [isTripsOpen, setIsTripsOpen] = useState(false);
  const [isDealsOpen, setIsDealsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 bg-gray-300 shadow-lg rounded-b-md p-3 flex items-center justify-between w-full z-50">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-14 h-14" />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 font-bold text-lg">
          <li className="hover:text-blue-950 hover:rotate-3">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-blue-950 hover:rotate-3">
            <Link to="/Flight">Flights</Link>
          </li>

          {/* My Trips Dropdown */}
          <li className="relative">
            <button onClick={() => setIsTripsOpen(!isTripsOpen)} className="hover:text-gray-200">
              My Trips ⌵
            </button>
            {isTripsOpen && (
              <ul className="absolute bg-white text-black shadow-md w-48 py-2 mt-2 rounded-md">
                <li>
                  <Link to="/UpcomingTrip" className="block px-4 py-2 hover:text-blue-950">
                    Upcoming Trips
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to="/ModifyBooking" className="block px-4 py-2 hover:text-blue-950">
                    Modify Booking
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to="/CancelBooking" className="block px-4 py-2 hover:text-blue-950">
                    Cancel Booking
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="hover:text-blue-950 hover:rotate-3">
            <Link to="/Checkin">Check-In</Link>
          </li>

          {/* Deals Dropdown */}
          <li className="relative">
            <button onClick={() => setIsDealsOpen(!isDealsOpen)} className="hover:text-gray-200">
              Deals ⌵
            </button>
            {isDealsOpen && (
              <ul className="absolute bg-white text-black shadow-md w-48 py-2 mt-2 rounded-md">
                <li>
                  <Link to="/FlightDiscounts" className="block px-4 py-2 hover:text-blue-950">
                    Flight Discounts
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to="/HotelOffers" className="block px-4 py-2 hover:text-blue-950">
                    Hotel Offers
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="hover:text-blue-950 hover:rotate-3">
            <Link to="/Support">Support/Help</Link>
          </li>
        </ul>

         <Searchbar />

        {/* Right Section - User Profile & Auth Links */}
        <div className="hidden md:flex items-center gap-4">
          <FaUserCircle size={20} className="hover:text-blue-950 cursor-pointer" />
          <Link to="/Login" className="hover:text-blue-950 font-bold hover:rotate-3">
            Login/
          </Link>
          <Link to="/Sign" className="hover:text-blue-950 font-bold hover:rotate-3">
            SignUp
          </Link>
        </div>
        

        {/* Mobile Menu Button with Search Icon */}
        <button className="md:hidden text-xl flex items-center gap-2" onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
          
        </button>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white shadow-lg flex flex-col z-50 p-5"
        >
          {/* Sidebar Header */}
          <div className="flex justify-between items-center">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <button onClick={() => setIsSidebarOpen(false)} className="text-2xl">
              <FaTimes />
            </button>
          </div>

          {/* Searchbar inside Sidebar */}
          <div className="mt-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center gap-2 p-2 bg-gray-700 rounded-md w-full text-left"
            >
              <FaSearch size={18} className="text-blue-400" />
              <span>Search</span>
            </button>
            {isSearchOpen && (
              <input 
                type="text"
                placeholder="Search..."
                className="mt-2 w-full px-4 py-2 rounded-md border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 block"
              />
            )}
          </div>

          {/* Sidebar Links */}
          <ul className="mt-5 space-y-4 text-lg">
            <li>
              <Link to="/" className="block hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Flight" className="block hover:text-blue-400">
                Flights
              </Link>
            </li>

            {/* My Trips Dropdown */}
            <li>
              <button onClick={() => setIsTripsOpen(!isTripsOpen)} className="w-full text-left">
                My Trips ⌵
              </button>
              {isTripsOpen && (
                <ul className="pl-4 space-y-2 mt-2">
                  <li>
                    <Link to="/UpcomingTrip" className="block hover:text-blue-400">
                      Upcoming Trips
                    </Link>
                  </li>
                  <li>
                    <Link to="/ModifyBooking" className="block hover:text-blue-400">
                      Modify Booking
                    </Link>
                  </li>
                  <li>
                    <Link to="/CancelBooking" className="block hover:text-blue-400">
                      Cancel Booking
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/Checkin" className="block hover:text-blue-400">
                Check-In
              </Link>
            </li>

            <li>
              <Link to="/Support" className="block hover:text-blue-400">
                Support/Help
              </Link>
            </li>
          </ul>

          {/* User Authentication */}
          <div className="mt-5 flex items-center gap-4">
            <FaUserCircle size={20} className="hover:text-blue-400 cursor-pointer" />
            <Link to="/Login" className="hover:text-blue-400">
              Login/
            </Link>
            <Link to="/Sign" className="hover:text-blue-400">
              SignUp
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;

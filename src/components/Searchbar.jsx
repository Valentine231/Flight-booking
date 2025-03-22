import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = ({ insideMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative flex ${insideMenu ? "flex-col items-start" : "items-center md:flex-row"}`}>
      {/* Search Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`p-2 rounded-full hover:bg-gray-300 transition-all duration-300 ${
          insideMenu ? "mt-4 self-start" : ""
        }`}
      >
        <FaSearch className="text-blue-950 cursor-pointer hidden md:block" size={20}  />
      </button>

      {/* Search Input - Only Show When Open */}
      {isOpen && (
        <input 
          type="text"
          placeholder="Search..."
          className={`absolute left-10 top-0 w-60 px-4 py-2 rounded-md border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all duration-300 ${
            insideMenu ? "relative left-0 mt-2 w-full" : ""
          }`}
        />
      )}
    </div>
  );
};

export default Searchbar;

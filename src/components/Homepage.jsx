import { useState, useEffect } from "react";
import Navbar from './Navbar'
import { ShieldCheck, Headphones, CreditCard, Tag, Star, BadgeCheck,Facebook, Twitter, Instagram, Linkedin  } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <ShieldCheck size={40} className="text-blue-600" />,
    title: "Best Price Guarantee",
    description: "Get the lowest fares available with no hidden costs.",
  },
  {
    icon: <Headphones size={40} className="text-blue-600" />,
    title: "24/7 Customer Support",
    description: "Our team is available anytime to assist you.",
  },
  {
    icon: <CreditCard size={40} className="text-blue-600" />,
    title: "Secure Payments",
    description: "Your transactions are safe with encrypted security.",
  },
  {
    icon: <Tag size={40} className="text-blue-600" />,
    title: "No Hidden Fees",
    description: "Transparent pricing with no unexpected charges.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    comment: "Fast & easy booking! Found the best deals.",
    rating: 5,
  },
  {
    name: "James L.",
    comment: "Great customer service, will book again!",
    rating: 4,
  },
  {
    name: "Emma R.",
    comment: "Very smooth experience, highly recommend.",
    rating: 5,
  },
  {
    name: "David P.",
    comment: "Loved the flexible date search feature!",
    rating: 4,
  },
];

const Homepage = () => {

  const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      
        {/* Hero Section */}
        <div className="relative w-full h-screen flex items-center justify-center text-white">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://assets.mixkit.co/videos/35281/35281-720.mp4" type="video/mp4" />
          </video>

          {/* Overlay Content */}
          <div className="relative z-10 bg-opacity-50 p-4 md:p-6 rounded-lg text-center flex flex-col gap-4 w-full max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold">
              Welcome to Safe<span className="text-blue-950">~</span>Air
            </h1>
            <p className="text-lg text-blue-950 font-extrabold">
              Experience the best flights around the world.
            </p>
            <Link to='/login'>
            <button className='relative z-10   bg-opacity-50 p-6 rounded-lg text-center shadow-md bg-blue-950 font-extrabold cursor-pointer hover:scale-90 w-50 md:left-10 '>
              Book Now
            </button>
            </Link>
            
          </div>
        </div>
        

        <div className='flex flex-col gap-7 w-fit'>
          <div className="w-80 h-30 right-1.5 bottom-7 relative rounded-md shadow-xl p-7 bg-white mx-auto md:relative md:left-70 md:bottom-7 md:w-253 md:h-50"></div>
          <div>
            <div className='flex flex-col justify-center gap-12 md:relative left-20'>
              <div className="flex flex-col gap-7 mx-4 md:relative md:left-[170px]">
                <h1 className="text-3xl md:text-5xl text-blue-950 font-extralight">
                  Start planning your next trip
                </h1>
                <p className="text-gray-800 text-lg">
                  Thinking of travelling somewhere soon? Here are some options to help you get started.
                </p>
              </div>
              {/* Destination Cards */}
              <div className="flex flex-col md:flex-row md:justify-center flex-wrap gap-8 px-4 py-10">
  {/* Card 1 */}
  <div className="overflow-hidden transition-transform transform hover:scale-105 cursor-pointer max-w-sm w-full bg-white rounded-3xl shadow-lg">
    <img 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu1zmszW9RjAG1M9LnpFM3RILkJJ3WEHGxmw&s"
      alt="Bali, Indonesia"
      className="rounded-t-3xl w-full h-48 object-cover"
    />
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl text-blue-950">Island of the Gods</h1>
      <hr />
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-400">Discover the Magic of Bali</p>
        <p className="font-extrabold text-3xl text-blue-950">»</p>
      </div>
    </div>
  </div>

  {/* Card 2 */}
  <div className="overflow-hidden transition-transform transform hover:scale-105 cursor-pointer max-w-sm w-full bg-white rounded-3xl shadow-lg">
    <img 
      src="https://img.freepik.com/premium-photo/romantic-evening-eiffel-tower-city-generative-ai_431161-65555.jpg"
      alt="Paris, France"
      className="rounded-t-3xl w-full h-48 object-cover"
    />
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl text-blue-950">City of Love</h1>
      <hr />
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-400">Experience La Vie En Rose</p>
        <p className="font-extrabold text-3xl text-blue-950">»</p>
      </div>
    </div>
  </div>

  {/* Card 3 */}
  <div className="overflow-hidden transition-transform transform hover:scale-105 cursor-pointer max-w-sm w-full bg-white rounded-3xl shadow-lg">
    <img 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_KSMMu85hgm1tzjOw9vEs3v0UPhe8N049Fe7hagRRIdUy9IOsoivu3sbD_Ibbr6Yev-8&usqp=CAU"
      alt="Tropical Paradise"
      className="rounded-t-3xl w-full h-48 object-cover"
    />
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl text-blue-950">Tropical Paradise</h1>
      <hr />
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-400">Tropical Bliss, Endless Adventure</p>
        <p className="font-extrabold text-3xl text-blue-950">»</p>
      </div>
    </div>
  </div>
</div>
</div>
</div>
        </div>
        <section className="bg-gray-100 py-12 w-full mt-30 flex flex-col gap-30">
          <div className="max-w-6xl mx-auto px-6 text-center gap-0 flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Book With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
            <div className="relative bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
              <div className="flex justify-center mb-2">
                {[...Array(testimonials[index].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-500" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 text-lg italic">"{testimonials[index].comment}"</p>
              <div className="mt-4 flex items-center justify-center">
                <BadgeCheck size={18} className="text-blue-500 mr-2" />
                <span className="font-semibold text-gray-800">{testimonials[index].name}</span>
              </div>
            </div>
          </div>
        </section>
        
        <footer className="bg-gray-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Company Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            {/* Help Center */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Help Center</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/faqs" className="hover:text-white">FAQs</a></li>
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
                <li><a href="/support" className="hover:text-white">Support</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/ugwu.valentine.796*7" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-6 h-6 hover:text-blue-500" />
                </a>
                <a href="https://twitter.com/val09797539?t=D_2D-UiPTTO_CrkSH5Z4sw&s=09" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-6 h-6 hover:text-blue-400" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-6 h-6 hover:text-pink-500" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6 hover:text-blue-700" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm mt-8">
            © {new Date().getFullYear()} Alvin✌️ et Val💀. All rights reserved.
          </div>
      </footer>
   
     
    </div>
  )
}

export default Homepage;
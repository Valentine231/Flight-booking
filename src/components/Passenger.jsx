import React, { useState } from 'react';
import useBookingStore from "../Store/Bookingstore";
import { supabase } from "../Supabase/Supabase"; // Import your Supabase client
import useAuth from "../Store/Auth";
import { useNavigate } from 'react-router-dom';

const Passenger = () => {
   
    const {
        passengers,
        removePassenger,
        addPassenger,
        updatePassenger,
        nextStep,
        prevStep,
        selectedFlight,
        user
    } = useBookingStore();

    const { user:User, loading } = useAuth();
   
    const [newPassenger, setNewPassenger] = useState({
        type: 'adult',
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'male',
        passport: '',
        nationality: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const navigate = useNavigate();

    
//   if (loading) return <p className="text-center">Loading...</p>;
  
//   if (!user || !session) {
//     return (

//       <div className="text-center py-8">
//      <h2 className="text-xl font-bold mb-4">Session Expired</h2>
//         <p>Please log in again to continue your booking</p>
//          <button 
//           onClick={() => window.location.href = '/login'}
//            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//        >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

    const validatePassenger = (passenger) => {
        const newErrors = {};
        if (!passenger.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!passenger.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!passenger.dob) newErrors.dob = 'Date of birth is required';
        if (passenger.type === 'child' && !passenger.dob) {
            const age = calculateAge(passenger.dob);
            if (age > 12) newErrors.dob = 'Child must be under 12 years old';
        }
        return newErrors;
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const difference = Date.now() - birthDate.getTime();
        const age = new Date(difference);
        return Math.abs(age.getUTCFullYear() - 1970);
    };

    const handleAddPassenger = () => {
        const validationErrors = validatePassenger(newPassenger);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        addPassenger(newPassenger);
        setNewPassenger({
            type: 'adult',
            firstName: '',
            lastName: '',
            dob: '',
            gender: 'male',
            passport: '',
            nationality: '',
            email: '',
            phone: ''
        });
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPassenger(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitBooking = async () => {
        if (passengers.length === 0) {
            alert('Please add at least one passenger');
            return;
        }
    
        if (!selectedFlight?.id) {
            alert('No flight selected');
            return;
        }
    
        if (!User?.id) {  // Add this check
            alert('User not authenticated');
            return;
        }
    
        setIsSubmitting(true);
        
        try {
            // Use User.id from useAuth instead of user.id from booking store
            const { data: booking, error: bookingError } = await supabase
                .from('bookings')
                .insert({
                    user_id: User.id,  // Changed from user.id to User.id
                    flight_id: selectedFlight.id,
                    total_price: selectedFlight.price.total,
                    currency: selectedFlight.price.currency,
                    status: 'pending',
                    payment_status: 'unpaid'
                })
                .select()
                .single();
            
            // ... rest of your booking logic
        } catch (error) {
            console.error('Booking error:', error);
            alert(`Booking failed: ${error.message}`);
        } finally {
            setIsSubmitting(false);
            alert('booking successfull')
        }

        navigate('/paymentroute')
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Passenger Information</h2>
            
            {/* List of existing passengers */}
            {passengers.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">
                        {passengers.length} Passenger{passengers.length !== 1 ? 's' : ''} Added
                    </h3>
                    <div className="space-y-4">
                        {passengers.map((passenger, index) => (
                            <div key={index} className="border rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium capitalize">
                                            {passenger.type}: {passenger.firstName} {passenger.lastName}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            DOB: {passenger.dob} | {passenger.gender}
                                        </p>
                                        {passenger.passport && (
                                            <p className="text-sm text-gray-600">
                                                Passport: {passenger.passport}
                                            </p>
                                        )}
                                    </div>
                                    <button 
                                        onClick={() => removePassenger(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Add new passenger form */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Add New Passenger</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                        <input
                            name="firstName"
                            value={newPassenger.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                        <input
                            name="lastName"
                            value={newPassenger.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                        <input
                            type="date"
                            name="dob"
                            value={newPassenger.dob}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                        <select
                            name="gender"
                            value={newPassenger.gender}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                        <input
                            name="passport"
                            value={newPassenger.passport}
                            onChange={handleInputChange}
                            placeholder="Passport Number"
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                        <input
                            name="nationality"
                            value={newPassenger.nationality}
                            onChange={handleInputChange}
                            placeholder="Nationality"
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                
                <button 
                    onClick={handleAddPassenger}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Add Passenger
                </button>
            </div>
            
            <div className="flex justify-between">
                <button 
                    onClick={prevStep}
                    className="px-6 py-2 border rounded hover:bg-gray-100 transition"
                    disabled={isSubmitting}
                >
                    Back to Flight Selection
                </button>
                <button 
                    onClick={handleSubmitBooking} 
                    disabled={passengers.length === 0 || isSubmitting}
                    className={`px-6 py-2 rounded transition ${passengers.length === 0 || isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
            </div>
        </div>
    );
};

export default Passenger;
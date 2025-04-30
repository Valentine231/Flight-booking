import React,{useEffect} from 'react';
import useBookingStore from "../Store/Bookingstore";
import { supabase } from '../Supabase/Supabase';
import useAuth from "../Store/Auth";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useNavigate } from 'react-router-dom';

const payment =()=>{
    const { selectedFlight, passengers, prevStep, bookingId } = useBookingStore();

    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        if (!selectedFlight) {
            navigate('/');
        }
    }, [user, selectedFlight, navigate]);

    if (authLoading) return <div>Loading...</div>;
    if (!user) return <div>Please login to continue</div>;
    if (!selectedFlight) return <div>No flight selected</div>;
    
    const config = {
        public_key:import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: Date.now().toString(),
        amount: selectedFlight?.price?.total || 0,
        currency: selectedFlight?.price?.currency || 'USD',
        payment_option: 'card,mobilemoney,ussd',
        customer:{
            email: user.email,
            name: `${passengers[0]?.firstName || ''} ${passengers[0]?.lastName || ''}`,
        },
        customizations: {
            title: 'Flight Booking',
            description: `Payment for flight from ${selectedFlight?.itineraries[0]?.segments[0]?.departure?.iataCode} to ${selectedFlight?.itineraries[0]?.segments[0]?.arrival?.iataCode} on ${new Date(selectedFlight?.itineraries[0]?.segments[0]?.departure?.at).toLocaleDateString()}`,
            logo: '../../assets/logo.png',
        },
       
    };
    
    const handleFlutterPayment = useFlutterwave(config);
    
    handleFlutterPayment({
        callback: (response) => {
        console.log(response);
        closePaymentModal();
        // Handle successful payment here
        if(response.status==='successful'){
            savedPayment(response.transaction_id);
        }
        },
        onClose: () => {},
    });


    const savedPayment = async (transaction_Id) => {
        const { data,  error:bookingError } = await supabase
            .from('bookings')
            .update([
                {
                    status: 'confirmed',
                    payment_status: 'paid',
                    payment_reference: transaction_Id,
                   
                }
            ])
            .eq('id', bookingId)
            .select()
            .single();
    
        // try {
        //     if (bookingError) throw bookingError;
            
        //     // Navigate to confirmation page or show success message
        //     alert('Booking and payment successful!');
        // } catch (error) {
        //     console.error('Booking error:', error);
        //     alert(`Payment was successful but booking failed: ${error.message}`);
        // }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                
                <div className="mb-4">
                    <p className="font-medium">Flight:</p>
                    <p>{selectedFlight?.itineraries[0]?.segments[0]?.departure?.iataCode} to 
                       {selectedFlight?.itineraries[0]?.segments[0]?.arrival?.iataCode}</p>
                </div>
                
                <div className="mb-4">
                    <p className="font-medium">Passengers:</p>
                    <p>{passengers.length} passenger{passengers.length !== 1 ? 's' : ''}</p>
                </div>
                
                <div className="mb-4">
                    <p className="font-medium">Total Amount:</p>
                    <p className="text-2xl font-bold">
                        {selectedFlight?.price?.currency} {selectedFlight?.price?.total}
                    </p>
                </div>
            </div>
            
            <div className="flex justify-between md:gap-10">
                <button 
                    onClick={prevStep}
                    className="px-6 py-2 border rounded hover:bg-gray-100 transition"
                >
                    Back to Passenger Details
                </button>

                <button 
                    onClick={ handleFlutterPayment}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    )
}



export default payment;
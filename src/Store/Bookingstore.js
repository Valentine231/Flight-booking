import { create } from 'zustand';

const useBookingStore = create((set) => ({
    // Booking state
    selectedFlight: null,
    passengers: [],
    bookingStep: 0, // 0: flight selection, 1: passenger details, 2: payment, 3: confirmation
    
    // Actions
    setSelectedFlight: (flight) => set({ selectedFlight: flight, bookingStep: 1 }),
    addPassenger: (passenger) => set((state) => ({
        passengers: [...state.passengers, passenger]
    })),
    updatePassenger: (index, updates) => set((state) => ({
        passengers: state.passengers.map((p, i) => 
            i === index ? { ...p, ...updates } : p
        )
    })),
    removePassenger: (index) => set((state) => ({
        passengers: state.passengers.filter((_, i) => i !== index)
    })),
    nextStep: () => set((state) => ({ bookingStep: state.bookingStep + 1 })),
    prevStep: () => set((state) => ({ bookingStep: state.bookingStep - 1 })),
    resetBooking: () => set({ selectedFlight: null, passengers: [], bookingStep: 0 }),
}));

export default useBookingStore;
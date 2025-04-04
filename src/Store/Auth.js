import { create } from "zustand";
import { supabase } from "../Supabase/Supabase";

const useAuth = create((set, get) => ({
    user: null,
    loading: false,
    error: null,
    
    // Initialize auth state (call this when your app starts)
    initialize: async () => {
        set({ loading: true });
        try {
            const { data: { session } } = await supabase.auth.getSession();
            set({ 
                user: session?.user || null,
                loading: false 
            });
            
            // Set up auth state listener
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                set({ user: session?.user || null });
            });
            
            return () => subscription?.unsubscribe();
        } catch (error) {
            set({ 
                error: error.message,
                loading: false 
            });
        }
    },
    
    // Login with email/password
    login: async ({ email, password }) => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            
            if (error) throw error;
            
            set({ 
                user: data.user,
                loading: false 
            });
            return data.user;
        } catch (error) {
            set({ 
                error: error.message,
                loading: false 
            });
            return null;
        }
    },
    
    // Sign up new user
    signup: async ({ email, password }) => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            
            if (error) throw error;
            
            set({ 
                user: data.user,
                loading: false 
            });
            return data.user;
        } catch (error) {
            set({ 
                error: error.message,
                loading: false 
            });
            return null;
        }
    },
    
    // Logout
    logout: async () => {
        set({ loading: true });
        try {
            await supabase.auth.signOut();
            set({ 
                user: null,
                loading: false 
            });
        } catch (error) {
            set({ 
                error: error.message,
                loading: false 
            });
        }
    },
    
    // Refresh user data
    refreshUser: async () => {
        set({ loading: true });
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            
            if (error) throw error;
            
            set({ 
                user,
                loading: false 
            });
            return user;
        } catch (error) {
            set({ 
                error: error.message,
                loading: false 
            });
            return null;
        }
    },
    
    // Update user profile
    updateProfile: async (updates) => {
        set({ loading: true });
        try {
            const { data, error } = await supabase.auth.updateUser(updates);
            
            if (error) throw error;
            
            set({ 
                user: data.user,
                loading: false 
            });
            return data.user;
        } catch (error) {
            set({ 
                error: error.message,
                loading: false 
            });
            return null;
        }
    }
}));

export default useAuth;





// zustand auth without session storage
// import { create } from "zustand";
// import { supabase } from "../Supabase/Supabase";

// const useAuth = create((set)=>({
//     user:null,
//     loading:false,
//     error:null,

    

//     login:async({email,password})=>{
//         set({loading:true,error:null})

        

//          const { data, error } = await supabase.auth.signInWithPassword({
//             email,
//             password,
//           });
//         if(error){
//             set({error:error.message,loading:false})
//         }else{
//             set({user:data.user,loading:false})
//             return({user:data.user})
//         }
//     },

//     signup:async({email,password})=> {
//         set({loading:true,error:null})


//         const { data, error } = await supabase.auth.signUp({
//             email,
//             password,
           
//         });

//         if(error){
//             set({error:error.message,loading:false})
//         }else{
//             set({user:data.user,loading:false})
//             return({user:data.user})
//         }

//     },

//     logout: async () => {
//         await supabase.auth.signOut();
//         set({ user: null });
//       },
// }))

// export default useAuth;
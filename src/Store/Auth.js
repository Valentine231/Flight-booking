import { create } from "zustand";
import { supabase } from "../Supabase/Supabase";

const useAuth = create((set, get) => ({
    user: null,
    loading: false,
    error: null,
    session: null, // Add session to state
  
    // Initialize auth state
    initialize: async () => {
      console.log('Initializing auth...');
      set({ loading: true });
      
      try {
        // First try to get existing session
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Initial session check:', session);
        
        if (error) throw error;
        
        // If no session but tokens might exist
        if (!session) {
          console.log('No session found, checking for user...');
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            console.log('User found but no session, refreshing...');
            const { data: refreshedSession, error: refreshError } = 
              await supabase.auth.refreshSession();
            
            if (refreshError) throw refreshError;
            
            set({ 
              user: refreshedSession.user,
              session: refreshedSession,
              loading: false 
            });
            return;
          }
        }
        
        // Set initial state
        set({ 
          user: session?.user || null,
          session: session || null,
          loading: false 
        });
        
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event);
            set({ 
              user: session?.user || null,
              session: session || null
            });
            
            // Handle token refresh
            if (event === 'TOKEN_REFRESHED') {
              console.log('Token refreshed');
            }
          }
        );
        
        return () => subscription?.unsubscribe();
      } catch (error) {
        console.error('Auth init error:', error);
        set({ 
          error: error.message,
          loading: false,
          user: null,
          session: null
        });
        // Clear invalid session
        await supabase.auth.signOut();
      }
    },
  
    // Login with improved error handling
    login: async ({ email, password }) => {
        set({ loading: true, error: null });
        try {
          console.log('Attempting login...'); // Debug
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
      
          // Immediately check storage
          console.log('Post-login storage:', {
            access: localStorage.getItem('sb-access-token'),
            refresh: localStorage.getItem('sb-refresh-token')
          });
      
          set({ user: data.user, loading: false });
          return data.user;
        } catch (error) {
          console.error('Login failed:', {
            error,
            storage: localStorage // Log entire storage
          });
          set({ error: error.message, loading: false });
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

    checkSession: async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          set({ user: null });
          return null;
        }
        if (user) {
          set({ user });
          return user;
        }
        return null;
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
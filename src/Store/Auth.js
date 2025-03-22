import { create } from "zustand";
import { supabase } from "../Supabase/Supabase";

const useAuth = create((set)=>({
    user:null,
    loading:false,
    error:null,

    login:async({emailorusername,password})=>{
        set({loading:true,error:null})

        const isEmail =emailorusername.includes('@')

         const { data, error } = await supabase.auth.signInWithPassword({
            email: isEmail ? emailorusername : null,
            password,
          });
        if(error){
            set({error:error.message,loading:false})
        }else{
            set({user:data.user,loading:false})
            return({user:data.user})
        }
    },

    signup:async({email,username,password})=> {
        set({loading:true,error:null})


        const {data,error} = await supabase.auth.signup({
            email,
            password,
            option:{data:{username}},
        });

        if(error){
            set({error:error.message,loading:false})
        }else{
            set({user:data.user,loading:false})
            return({user:data.user})
        }

    },

    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null });
      },
}))
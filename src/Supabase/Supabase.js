import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY,{
    auth: {
        persistSession: true,
        storage: {
          getItem: (key) => {
            // JSON parse for auth-token, raw for others
            const item = localStorage.getItem(key);
            return key.includes('auth-token') ? JSON.parse(item) : item;
          },
          setItem: (key, value) => {
            // JSON stringify for auth-token, raw for others
            localStorage.setItem(
              key, 
              key.includes('auth-token') ? JSON.stringify(value) : value
            );
          },
          removeItem: (key) => localStorage.removeItem(key)
        }
      }
});

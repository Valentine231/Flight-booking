// App.js
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { supabase } from './Supabase/Supabase';
import useAuth from './Store/Auth';

const App = () => {
  const initialize = useAuth(state => state.initialize);
  
  useEffect(() => {
    // Initialize auth only once
    initialize();
    
    // Check session periodically (every 5 minutes)
    const interval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session check:', session);
    }, 300000);
    
    return () => clearInterval(interval);
  }, [initialize]);

  return <Outlet />;
};

export default App;
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import useAuth from './Store/Auth';


const App = () => {
  const initialize = useAuth(state => state.initialize);
    
  useEffect(() => {
      initialize();
  }, [initialize]);

  return (
    <div>
     
      <Outlet />

    </div>
  )
}

export default App;

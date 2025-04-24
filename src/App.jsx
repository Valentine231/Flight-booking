// App.js
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from './Store/Auth';

const App = () => {
  useEffect(() => {
    useAuth.getState().initialize();
  }, []);

  return <Outlet />;
};

export default App;
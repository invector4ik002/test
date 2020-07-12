import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css';

import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import  Navbar  from './components/Navbar';

function App() {
  const { login, logout, token, userId } = useAuth()
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
   return (
      <AuthContext.Provider value={{ login, logout, token, userId, isAuthenticated }}>
         <Router>
            <Navbar isAuthenticated={isAuthenticated}/>
            <div className='container'>
               {routes}
            </div>
        </Router>
      </AuthContext.Provider>
  
  );
}

export default App;

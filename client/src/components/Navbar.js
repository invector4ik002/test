import React, { useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';



export const Navbar = () => {

   const history = useHistory();
   const auth = useContext(AuthContext);
   const { token } = useAuth()
   const isAuthenticated = !!token;

   const logoutHandler = (event) => {
      event.preventDefault();
      auth.logout();
      history.push('/');
   }

   return (
      <nav>
         <div className="nav-wrapper blue-grey darken-1 nav-wrapper_padding">
           <a href="/" className="brand-logo">Test</a>
           <ul className="right hide-on-med-and-down" id="nav-mobile">
             <li><NavLink to='/edit/'>Создать пост</NavLink></li>
             {/* {isAuthenticated && <li><a href="/">Вход</a></li>} */}
             { isAuthenticated &&  <li><a href="/" onClick={logoutHandler}>Выход</a></li>}
           </ul>
         </div>
      </nav>
   )
}
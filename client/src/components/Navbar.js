import React, { useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
   const history = useHistory();
   const auth = useContext(AuthContext);
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
             <li><a href="/">Вход</a></li>
             <li><a href="/" onClick={logoutHandler}>Выход</a></li>
           </ul>
         </div>
      </nav>
   )
}
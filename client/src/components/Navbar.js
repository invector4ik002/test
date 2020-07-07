import React, { useContext, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';

export const Navbar = () => {

   const history = useHistory();
   const auth = useContext(AuthContext);

   const { token } = useAuth()
   const isAuthenticated = !!token;

   const [search, setSearch] = useState({
      name:''
   });
   
   const logoutHandler = (event) => {
      event.preventDefault();
      auth.logout();
      history.push('/');
   }

   const changeHandler = (event) => {
      setSearch({...search, [event.target.name]: event.target.value})
   }

   // const searchHandler = () => {
      
   // }

   return (
      <nav>
         <div className="nav-wrapper blue-grey darken-1 nav-wrapper_padding">
            {/* <div className=''> */}
               <h5 className="brand-logo">Test</h5>

               {isAuthenticated && <div className='center'>
                  <input 
                     className="search-input" 
                     id="search" 
                     name='search' 
                     type="search" 
                     required 
                     placeholder="Поиск по имени"
                     onChange={changeHandler}
                  />
                  {/* <button 
                     className='waves-effect blue accent-2 btn-small' 
                     htmlFor='search'
                     onClick={searchHandler}
                     >поиск
                  </button> */}
               </div>}


               <ul className="right hide-on-med-and-down margin-left" id="nav-mobile">
                  <li><NavLink to='/edit/'>Создать пост</NavLink></li>
                  { isAuthenticated &&  <li><NavLink to="/" onClick={logoutHandler}>Выход</NavLink></li>}
               </ul>
           {/* </div> */}
         </div>
      </nav>
   )
}
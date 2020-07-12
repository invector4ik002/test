import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';
import { connect, useDispatch } from 'react-redux';
import { searchPost } from '../redux/action';
import { filterPosts } from '../redux/action';

const Navbar = ({searchPosts}) => {
   console.log(searchPosts)
   const dispatch = useDispatch()
   const history = useHistory();
   const auth = useContext(AuthContext);
   const { token } = useAuth()
   const isAuthenticated = !!token;
   const [search, setSearch] = useState('');
   
   const logoutHandler = () => {
      // event.preventDefault();
      auth.logout();
      history.push('/');
   }

   const changeHandler = (event) => {
      setSearch({...search, [event.target.name]: event.target.value})
   }
   // console.log(typeof searchPost)
   // searchPost(search)
   const searchHandler = () => {
      dispatch(searchPost(search));
      dispatch(filterPosts(search));
   // console.log(search)
   //  searchPost(false)
   }

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
                  <button 
                     className='waves-effect blue accent-2 btn-small' 
                     htmlFor='search'
                     //() => dispatch(searchPost(search))
                     onClick={searchHandler}
                     >поиск
                  </button>
               </div>}


               <ul className="right hide-on-med-and-down margin-left" id="nav-mobile">
                  <li><Link to='/edit/'>Создать пост</Link></li>
                  { isAuthenticated &&  <li><Link to="/" onClick={logoutHandler}>Выход</Link></li>}
               </ul>
           {/* </div> */}
         </div>
      </nav>
   )
}


const mapStateToProps = (state) => {
   // console.log(state)
   return {
      searchPosts: state.filter.fetchPosts
   }
}
// const mapDispatchToProps = {
//    searchPost
// }
// console.log(typeof searchPost)
export default connect(mapStateToProps ,null)(Navbar);
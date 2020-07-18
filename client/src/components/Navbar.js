import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { connect, useDispatch } from 'react-redux';
import { searchPost } from '../redux/action';
import { filterPosts } from '../redux/action';
import { useHttp } from '../hooks/http.hook';
import { getPosts } from '../redux/action';
import { getArrSearch } from '../redux/action';

const Navbar = ({ getArr, isAuthenticated, stateArr, searchItem }) => {

   const dispatch = useDispatch()
   const history = useHistory();
   const auth = useContext(AuthContext);
   const { request } = useHttp();
   const [search, setSearch] = useState('');
   const [allposts, setAllPosts] = useState([]);
   
   const fetchPosts = useCallback( async () => {
      try {
         const fetched = await request('/api/post', 'GET', null, {})
         dispatch(getPosts(fetched));
      } catch(err){}
   }, [request, dispatch])

   useEffect(() => {
      fetchPosts()
   },[fetchPosts])

   const logoutHandler = () => {
      auth.logout();
      history.push('/');
   }

   const changeHandler = (event) => {
      setSearch({[event.target.name]: event.target.value})
   }

   const searchHandler = (event) => {//поиск

      if(searchItem.search === "" || !getArr.length){
         fetchPosts()
      }

      const regexp = new RegExp(searchItem.search, 'i');
      setAllPosts(stateArr.filter((el) => regexp.test(el.name)));
      dispatch(getArrSearch(allposts));

      dispatch(filterPosts(getArr));
      dispatch(searchPost(search));
      event.preventDefault();  
   }

   return (
      <nav>
         <div className="nav-wrapper blue-grey darken-1 nav-wrapper_padding">
            {/* <div className=''> */}
               <h5 className="brand-logo">Test</h5>

               { isAuthenticated && <form onSubmit={searchHandler} className='center'>
                  <input 
                     className="search-input" 
                     id="search" 
                     name='search' 
                     type="text" 
                     placeholder="Поиск по имени"
                     onChange={changeHandler}
                  />
                  <button 
                     type="submit"
                     className='waves-effect blue accent-2 btn-small' 
                     htmlFor='search'
                     >поиск
                  </button>
               </form>}

               <ul className="right hide-on-med-and-down margin-left" id="nav-mobile">
                  {isAuthenticated && <li><Link to='/edit/'>Создать пост</Link></li>}
                  {isAuthenticated && <li><Link to="/" onClick={logoutHandler}>Выход</Link></li>}
               </ul>
           {/* </div> */}
         </div>
      </nav>
   )
}

const mapStateToProps = (state) => {
   // console.log(state)
   return {
      searchItem: state.search.search,
      // searchPosts: state.get.fetchPosts,
      stateArr: state.get.fetchPosts,
      getArr: state.search.getArrSearch
   }
}

export default connect(mapStateToProps, null)(Navbar);
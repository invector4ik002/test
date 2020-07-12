import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

import { AuthContext } from '../context/AuthContext';
// import { useAuth } from '../hooks/auth.hook';
import { connect, useDispatch } from 'react-redux';
import { searchPost } from '../redux/action';
import { filterPosts } from '../redux/action';
import { useHttp } from '../hooks/http.hook';
import { getPosts } from '../redux/action';


const Navbar = ({ searchPosts, getArr, isAuthenticated }) => {
   console.log('Navbar.js property-searchPosts:', searchPosts)
   console.log('Navbar.js property-getArr:', getArr)
   const dispatch = useDispatch()
   const history = useHistory();
   const auth = useContext(AuthContext);
   // const { token } = useAuth()
   const { request } = useHttp();
   const [search, setSearch] = useState('');
   // const [bolean, setBolean] = useState(false);
   // const [posts, setPosts] = useState([]);
   // const isAuthenticated = !!token;

   // ставим тут иф на search и запуск функции с ренднром массива с сервера(из стора)
   
   const fetchPosts = useCallback( async () => {
      try {
         const fetched = await request('/api/post', 'GET', null, {
            // Authorization: `Bearer ${token}`
         })
         // setPosts(fetched)
         dispatch(getPosts(fetched));
      } catch(err){}
      //token
   }, [request,dispatch])

   
   // dispatch(getPosts(posts));
   // dispatch(getPosts(posts));
   

   const logoutHandler = (event) => {
      // event.preventDefault();
      auth.logout();
      history.push('/');
   }

   const changeHandler = (event) => {
      setSearch({[event.target.name]: event.target.value})
   }
   // console.log(typeof searchPost)
   // searchPost(search)
   
   const searchHandler = () => {//поиск
      
      dispatch(searchPost(search));
      dispatch(filterPosts(getArr));
      // fetchPosts()
      console.log('Navbar (f) searchHandler :', search);
      console.log('Navbar (f) searchHandler getArr :', getArr);

      if(!getArr.length){
         fetchPosts()
         // return
      } else {
         return
      }
   }

   useEffect(() => {
      if(!getArr.length){
         fetchPosts()
      } else {
         return
      }
   },[fetchPosts, getArr.length])

   return (
      <nav>
         <div className="nav-wrapper blue-grey darken-1 nav-wrapper_padding">
            {/* <div className=''> */}
               <h5 className="brand-logo">Test</h5>

               { isAuthenticated && <div className='center'>
                  <input 
                     className="search-input" 
                     id="search" 
                     name='search' 
                     type="search" 
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
      searchPosts: state.get.fetchPosts,
      getArr: state.search.getArrSearch
   }
}
// const mapDispatchToProps = {
//    searchPost
// }
// console.log(typeof searchPost)
export default connect(mapStateToProps ,null)(Navbar);
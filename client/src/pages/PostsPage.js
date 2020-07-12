// useContext, 
import React, {useState, useCallback, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';

import { Post } from '../components/Post';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { getPosts } from '../redux/action';

const PostsPage = ({searchItem, stateArr}) => {
   console.log(searchItem)
   console.log(stateArr)
   const [posts, setPosts] = useState([]);
   const [allposts, setAllPosts] = useState([]);
   const {loading, request} = useHttp();
   const dispatch = useDispatch();
   const x = searchItem.search;
   console.log('allposts',allposts)

   useEffect(() => {
      dispatch(getPosts(posts));
      const regexp = new RegExp(x, 'i' );
      setAllPosts(posts.filter((el) => regexp.test(el.name)));
   },[x, posts, dispatch])
  
   // const {token} = useContext(AuthContext);
   const fetchPosts = useCallback( async () => {
      try {
         const fetched = await request('/api/post', 'GET', null, {
            // Authorization: `Bearer ${token}`
         })
         setPosts(fetched)
      } catch(err){}
      //token
   }, [request])
 
   useEffect(() => {
      fetchPosts()
   },[fetchPosts])

   if (loading) {
      return (
         <Loader />
      )
   }

   return (
      <>
         {!loading && <Post 
            stateArr={stateArr} 
            // allposts={allposts}
         />}
      </>
   )
};

const mapStateToProps = (state) => {
   return {
      searchItem: state.search.search,
      stateArr: state.get.fetchPosts,
   }
}

export default connect(mapStateToProps, null)(PostsPage);
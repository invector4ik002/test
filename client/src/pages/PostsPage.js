// useContext, 
import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';

import { Post } from '../components/Post';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
// import { getPosts } from '../redux/action';
import { getArrSearch } from '../redux/action';

const PostsPage = ({ searchItem, stateArr }) => {
   console.log('PostPage searchItem:',searchItem)
   console.log('PostPage stateArr:',stateArr)
   // const [posts, setPosts] = useState([]);
   const [allposts, setAllPosts] = useState([]);
   const { loading } = useHttp();
   const dispatch = useDispatch();
   const x = searchItem.search;
   
   
   // dispatch(getPosts(posts));
   // console.log('PostPage.js (h) setPosts:', posts);
   console.log('PostPage (h) setAllPosts:',allposts);

   useEffect(() => {
      const regexp = new RegExp(x, 'i' );
      setAllPosts(stateArr.filter((el) => regexp.test(el.name)));//???
      
   },[x, stateArr, dispatch])
   dispatch(getArrSearch(allposts));
   // const {token} = useContext(AuthContext);
   // const fetchPosts = useCallback( async () => {
   //    try {
   //       const fetched = await request('/api/post', 'GET', null, {
   //          // Authorization: `Bearer ${token}`
   //       })
   //       setPosts(fetched)
   //    } catch(err){}
   //    //token
   // }, [request])
 
   // useEffect(() => {
   //    fetchPosts()
   // },[])

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
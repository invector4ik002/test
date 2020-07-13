// useContext, 
import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';

import { Post } from '../components/Post';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { getArrSearch } from '../redux/action';

const PostsPage = ({ searchItem, stateArr }) => {
   const [allposts, setAllPosts] = useState([]);
   const { loading } = useHttp();
   const dispatch = useDispatch();
   const x = searchItem.search;
   
   useEffect(() => {
      const regexp = new RegExp(x, 'i' );
      setAllPosts(stateArr.filter((el) => regexp.test(el.name)));//???
      
      dispatch(getArrSearch(allposts));
   },[x, stateArr, dispatch])

   if (loading) {
      return (
         <Loader />
      )
   }

   return (
      <>
         {!loading && <Post 
            stateArr={stateArr} 
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
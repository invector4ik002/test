// useContext, 
// , {useState, useEffect} 
import React from 'react';
// , useDispatch 
import { connect} from 'react-redux';

import { Post } from '../components/Post';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
// import { getArrSearch } from '../redux/action';

const PostsPage = ({ stateArr }) => {
   // console.log('PostPage: searchItem', searchItem)
   console.log('12: PostPage: stateArr', stateArr)
   // const [allposts, setAllPosts] = useState([]);
   const { loading } = useHttp();
   // const dispatch = useDispatch();
   // const x = searchItem.search;
   
   // useEffect(() => {
   //    console.log('18: useEffect:',typeof x )
   //    const regexp = new RegExp(x, 'i');
   //    setAllPosts(stateArr.filter((el) => regexp.test(el.name)));//???
      
   //    dispatch(getArrSearch(allposts));
   // },[x, stateArr, dispatch])

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
      // searchItem: state.search.search,
      stateArr: state.get.fetchPosts,
   }
}

export default connect(mapStateToProps, null)(PostsPage);
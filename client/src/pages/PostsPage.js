import React from 'react';
import { connect} from 'react-redux';

import { Post } from '../components/Post';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';

const PostsPage = ({ stateArr }) => {
   const { loading } = useHttp();

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
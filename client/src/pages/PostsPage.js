import React, {useState, useContext, useCallback, useEffect} from 'react';

import { Post } from '../components/Post';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import { Loader } from '../components/Loader';

export const PostsPage = () => {
   const [posts, setPosts] = useState([]);
   const {loading, request} = useHttp();
   const {token} = useContext(AuthContext);

   const fetchPosts = useCallback( async () => {
      try {
         const fetched = await request('/api/post', 'GET', null, {
            Authorization: `Bearer ${token}`
         })
         setPosts(fetched)
      } catch(err){}
      
   }, [token, request])
   
   useEffect(() => {
      fetchPosts()
   }, [fetchPosts])
   
   if (loading) {
      return (
         <Loader />
      )
   }
   
   return (
      <>
         {!loading && <Post posts={posts}/>}
      </>
   )
}
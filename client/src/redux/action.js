import { SEARCH_POST, FETCH_POSTS, FILTER_POSTS } from './types'

export function searchPost(value) {
   return {
      type: SEARCH_POST,
      payload: value
   } 
}

export function getPosts(value) {
   return {
      type: FETCH_POSTS,
      payload: value
   }
}

export function filterPosts(value) {
   return {
      type: FILTER_POSTS,
      payload: value 
   }
}
import { FETCH_POSTS, FILTER_POSTS } from './types';
const initialState = {
   fetchPosts:[],
}

export const getPosts = ( state = initialState, action ) => {
   switch(action.type) {
      case FETCH_POSTS:
         // return {...state, fetchPosts: state.fetchPosts.concat(action.payload)}
         return {fetchPosts: action.payload}
         case FILTER_POSTS:
            // return {...state, fetchPosts: state.fetchPosts.concat(action.payload)}
            return {...state, fetchPosts: action.payload}
      default: return state
   }
}
// export const filterPosts = ( state = initialState, action ) => {
//    switch(action.type) {
      
//       default: return state
//    }
// }
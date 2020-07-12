import { combineReducers } from 'redux';
import { searchReduser } from './searchReduser';
import { getPosts, filterPosts } from './getPosts';

export const rootReduser = combineReducers({
   search: searchReduser,
   get: getPosts,
   filter: filterPosts
})
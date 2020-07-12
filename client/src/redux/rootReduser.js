import { combineReducers } from 'redux';
import { searchReduser } from './searchReduser';
import { getPosts } from './getPosts';

export const rootReduser = combineReducers({
   search: searchReduser,
   get: getPosts
})
import { SEARCH_POST, GETARR_SEARCH } from './types';
const initialState = {
   search: '',
   getArrSearch: []
}

export const searchReduser = ( state = initialState, action ) => {
   switch(action.type) {
      case SEARCH_POST:
         return {...state, search: action.payload}
      case GETARR_SEARCH:
         return {...state,  getArrSearch: action.payload}
      default: return state
   }
}
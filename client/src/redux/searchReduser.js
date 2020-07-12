import { SEARCH_POST } from './types';
const initialState = {
   search: '',
}

export const searchReduser = ( state = initialState, action ) => {
   switch(action.type) {
      case SEARCH_POST:
         // return {...state, search:( ...state.searche, (action.payload)) }
         return {...state, search: action.payload}
      default: return state
   }
}
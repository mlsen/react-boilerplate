import {List} from 'immutable';
import {combineReducers} from 'redux';

const initialState = List(['marius', 'theo']);

function names(state = initialState, action) {
  switch(action.type) {
    case 'ADD_NAME':
      return state.push(action.name);
    default:
      return state;
  }
}

export default combineReducers({
  names
});

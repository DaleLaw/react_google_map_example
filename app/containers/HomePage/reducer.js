import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import {
  ADD_LOCATION,
  SELECT_LOCATION,
  REMOVE_LOCATION,
} from './constants';

export const initialLocationsState = fromJS([null, null]);
export const locations = (state = initialLocationsState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return state.push(null);
    case SELECT_LOCATION:
      return state.set(action.index, action.location);
    case REMOVE_LOCATION:
      return state.delete(action.index);
    default:
      return state;
  }
};

export const initialRouteState = fromJS({});
export const route = (state = initialRouteState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  locations,
  route,
});

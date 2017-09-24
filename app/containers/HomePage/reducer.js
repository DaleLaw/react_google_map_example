import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import {
  ADD_LOCATION,
  SELECT_LOCATION,
  REMOVE_LOCATION,
  GET_ROUTE_SUCCESS,
  GET_ROUTE_FAILED,
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
    case SELECT_LOCATION:
      return initialRouteState;
    case GET_ROUTE_SUCCESS:
      return fromJS({
        token: action.token,
        path: action.path,
        totalDistance: action.totalDistance,
        totalTime: action.totalTime,
      });
    case GET_ROUTE_FAILED:
      return initialRouteState;
    default:
      return state;
  }
};

export const initialErrorState = null;
export const error = (state = initialErrorState, action) => {
  switch (action.type) {
    case SELECT_LOCATION:
      return initialErrorState;
    case GET_ROUTE_FAILED:
      return action.message;
    default:
      return state;
  }
};

export default combineReducers({
  locations,
  route,
  error,
});

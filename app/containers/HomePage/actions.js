import {
  ADD_LOCATION,
  SELECT_LOCATION,
  REMOVE_LOCATION,
  SUBMIT_LOCATIONS_SUCCESS,
  SUBMIT_LOCATIONS_FAILED,
  GET_ROUTE_SUCCESS,
  GET_ROUTE_FAILED,
} from './constants';

export const addLocation = () => ({
  type: ADD_LOCATION,
});

export const selectLocation = (index, location) => ({
  type: SELECT_LOCATION,
  index,
  location,
});

export const removeLocation = (index) => ({
  type: REMOVE_LOCATION,
  index,
});

export const getRouteSuccess = (token, path, totalDistance, totalTime) => ({
  type: GET_ROUTE_SUCCESS,
  token,
  path,
  totalDistance,
  totalTime,
});

export const getRouteFailed = (message) => ({
  type: GET_ROUTE_FAILED,
  message,
});

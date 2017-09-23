import {
  ADD_LOCATION,
  SELECT_LOCATION,
  REMOVE_LOCATION,
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

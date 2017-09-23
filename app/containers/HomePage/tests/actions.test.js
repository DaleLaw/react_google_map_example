import { addLocation, selectLocation, removeLocation } from '../actions';
import { ADD_LOCATION, SELECT_LOCATION, REMOVE_LOCATION } from '../constants';

describe('App Actions', () => {
  describe('Location Actions', () => {
    it('should return correctly for addLocation', () => {
      expect(addLocation()).toEqual({
        type: ADD_LOCATION,
      });
    });

    it('should return correctly for selectLocation', () => {
      expect(selectLocation(10, { lat: 10, lng: 10 })).toEqual({
        type: SELECT_LOCATION,
        index: 10,
        location: { lat: 10, lng: 10 },
      });
    });

    it('should return correctly for removeLocation', () => {
      expect(removeLocation(10)).toEqual({
        type: REMOVE_LOCATION,
        index: 10,
      });
    });
  });
});

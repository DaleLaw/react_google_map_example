import { fromJS } from 'immutable';
import { addLocation, selectLocation, removeLocation } from '../actions';
import { locations, route, initialLocationsState, initialRouteState } from '../reducer';

describe('App Reducers', () => {
  describe('locations', () => {
    it('should return default state', () => {
      const state = locations(undefined, { type: 'unkwon_action' });
      expect(state).toEqual(initialLocationsState);
    });

    it('should return correct state for addLocation', () => {
      const state = locations(initialLocationsState, addLocation());
      expect(state).toEqual(fromJS([
        null, null, null,
      ]));
    });

    it('should return correct state for selectLocation', () => {
      const state = locations(initialLocationsState, selectLocation(1, { lat: 10, lng: 10 }));
      expect(state).toEqual(fromJS([null]).push({ lat: 10, lng: 10 }));
    });

    it('should return correct state for removeLocation', () => {
      const state = locations(initialLocationsState, removeLocation(1));
      expect(state).toEqual(fromJS([null]));
    });
  });

  describe('route', () => {
    it('should return default state', () => {
      const state = route(undefined, { type: 'unkwon_action' });
      expect(state).toEqual(initialRouteState);
    });
  });
});

import { fromJS } from 'immutable';
import { addLocation, selectLocation, removeLocation, getRouteSuccess, getRouteFailed } from '../actions';
import { locations, route, error, initialLocationsState, initialRouteState, initialErrorState } from '../reducer';

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

    it('should clear state', () => {
      const state = route({ path: {} }, selectLocation(1, {}));
      expect(state).toEqual(initialRouteState);
      const state2 = route({ path: {} }, getRouteFailed('error message'));
      expect(state2).toEqual(initialRouteState);
    });

    it('should update route on success', () => {
      const state = route(initialRouteState, getRouteSuccess('token', [['10', '10'], ['20', '20']], 10, 20));
      expect(state).toEqual(fromJS({
        token: 'token',
        path: [['10', '10'], ['20', '20']],
        totalDistance: 10,
        totalTime: 20,
      }));
    });
  });

  describe('error', () => {
    it('should return default state', () => {
      const state = error(undefined, { type: 'unkwon_action' });
      expect(state).toEqual(initialErrorState);
    });

    it('should clear state', () => {
      const state = error('somethings', selectLocation(1, {}));
      expect(state).toEqual(initialErrorState);
    });

    it('should show error', () => {
      const state = error(initialErrorState, getRouteFailed('error message'));
      expect(state).toEqual('error message');
    });
  });
});

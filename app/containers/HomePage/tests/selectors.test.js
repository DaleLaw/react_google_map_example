import { fromJS } from 'immutable';
import makeSelectAppDomain, { selectAppDomain, makeSelectLocations, makeSelectRoute } from '../selectors';

describe('Home Page Selectors', () => {
  const globalState = fromJS({ app: { locations: [null, null], route: {} } });
  it('should return correctly for selectAppDomain', () => {
    const state = selectAppDomain()(globalState);
    expect(state).toEqual(fromJS({ locations: [null, null], route: {} }));
  });

  it('should return correctly for makeSelectLocations', () => {
    const state = makeSelectLocations()(globalState);
    expect(state).toEqual([null, null]);
  });

  it('should return correctly for makeSelectRoute', () => {
    const state = makeSelectRoute()(globalState);
    expect(state).toEqual({});
  });

  it('should return correctly for makeSelectAppDomain', () => {
    const state = makeSelectAppDomain()(globalState);
    expect(state).toEqual({ locations: [null, null], route: {} });
  });
});

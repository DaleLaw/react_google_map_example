import { createSelector } from 'reselect';
// import { toJS } from 'immutable';

/**
 * Direct selector to the app state domain
 */
const selectAppDomain = () => (state) => state.get('app');

/**
 * Other specific selectors
 */
const makeSelectLocations = () => createSelector(
  selectAppDomain(),
  (substate) => substate.get('locations').toJS(),
);
const makeSelectRoute = () => createSelector(
  selectAppDomain(),
  (substate) => substate.get('route').toJS(),
);

/**
 * Default selector used by HomePage
 */

const makeSelectAppDomain = () => createSelector(
  selectAppDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAppDomain;
export {
  selectAppDomain,
  makeSelectLocations,
  makeSelectRoute,
};

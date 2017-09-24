import { call, select, put, takeLatest } from 'redux-saga/effects';
import { submitLocations, getRoute } from 'utils/api';
import { SELECT_LOCATION } from './constants';
import { makeSelectLocations } from './selectors';
import { getRouteSuccess, getRouteFailed } from './actions';

const RETRY_LIMIT = 5;
// This function wraps another function in a for loop to retry
function* autoRetry(func) {
  let error;
  for (let i = 0; i < RETRY_LIMIT; i += 1) {
    try {
      const response = yield func;
      if (response.status !== 'in progress') {
        return response;
      }
    } catch (e) {
      error = e;
    }
  }
  throw error;
}

// This chains 2 API calls: /route and /route/token
// and wrap it as a single action
function* submitLocationsAndGetRoute() {
  const locations = yield select(makeSelectLocations());
  const allSearchBoxFilled = locations.filter((l) => l != null).length === locations.length;
  if (allSearchBoxFilled) {
    try {
      const data = locations.map((l) => [`${l.location.lat}`, `${l.location.lng}`]);
      const response = yield autoRetry(call(submitLocations, data));
      const response2 = yield autoRetry(call(getRoute, response.token));
      if (response2.status === 'success') {
        yield put(getRouteSuccess(response.token, response2.path, response2.total_distance, response2.total_time));
      } else {
        yield put(getRouteFailed(response2.error));
      }
    } catch (e) {
      yield put(getRouteFailed(e.message));
    }
  }
}

// This is the watcher that submitLocationsAndGetRoute whenever a user selected a location
function* submitLocationsSaga() {
  yield takeLatest(SELECT_LOCATION, submitLocationsAndGetRoute);
}

export default [
  submitLocationsSaga,
];

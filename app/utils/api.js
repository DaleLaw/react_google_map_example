import request from 'utils/request';

const API_URL = 'http://localhost:3002';

export const submitLocations = (locations) => {
  const requestURL = `${API_URL}/route`;
  return request(requestURL, { method: 'POST', body: JSON.stringify(locations) });
};

export const getRoute = (token) => {
  const requestURL = `${API_URL}/route/${token}`;
  return request(requestURL, { method: 'GET' });
};

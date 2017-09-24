This repository is demo of React + Google Map Route Planner. 
It takes user input of pickup location and drop-off locations. Then send the location data to a mock Server to get the shortest path and display that path on a Google Map.

# Screenshot
![Screenshot](https://github.com/DaleLaw/react_google_map_example/blob/master/screenshot.png)

# Features
- Adress search based on Geosuggest
- Support up to 20 intermediate locations
- Display sample ruote
- Auto retry to server API
- Display Error message from server API

# Getting Started
```Shell
# install dependencies
npm install

# start web app server on http://localhost:3001
npm start

# start mock API server on http://localhost:3002
npm launch:mock-server
```

# App Design
## Components
__app/containers/HomePage__: This is the main page of the app, it contains all other components

__app/components/SideMenu__: The left side of the page, it contains all the input boxes and buttons

__app/components/Map__: The Google Map component

__app/components/AddLocationButton__: The button to add location, placed in SideMenu

__app/components/LocationSearchBox__: Placed in SideMenu, it displays Geosuggest when user types


## Application State Shape
````javascript
{
  app: {
    // locations represent the user input in search box
    locations: [{
      name: 'name',
      lat: 22.2,
      lng: 11.1,
    }, null],
    // route represents the route got from server side
    route: {
      path: [
        ["22.372081", "114.107877"],
        ["22.326442", "114.167811"],
        ["22.284419", "114.159510"]
      ],
      totalDistance: 20000,
      totalTime: 1800
    },
    // error represents any error message that needs to be displayed on screen
    error: '',
  }
}
````

## Call to Server Side API
It uses Redux-saga to perform the call to server side API.
In __app/containers/HomePage/sagas.js__:
```javascript
const RETRY_LIMIT = 5;
// This function wraps another function in a for loop to retry
function* autoRetry(func) {
  ...
}

// This chains 2 API calls: /route and /route/token
// and wrap it as a single action
function* submitLocationsAndGetRoute() {
  ...
      const response = yield autoRetry(call(submitLocations, data));
      const response2 = yield autoRetry(call(getRoute, response.token));
      if (response2.status === 'success') {
        yield put(getRouteSuccess(response.token, response2.path, response2.total_distance, response2.total_time));
      } else {
        yield put(getRouteFailed(response2.error));
      }
  ...
}

// This is the watcher that submitLocationsAndGetRoute whenever a user selected a location
function* submitLocationsSaga() {
  yield takeLatest(SELECT_LOCATION, submitLocationsAndGetRoute);
}
```

# Used Libraries
[react-boilerplate](https://github.com/react-boilerplate/react-boilerplate): A React boilerplate with React, Redux, Redux-saga, jest, etc pre-installed

[react-google-maps](https://github.com/tomchentw/react-google-maps): For displaying Google Map, Markers And Directions

[react-geosuggest](https://github.com/ubilabs/react-geosuggest): For the Search Box the search

[jest-single-file-coverage](https://github.com/DaleLaw/jest-single-file-coverage): A Helper library for unit testing

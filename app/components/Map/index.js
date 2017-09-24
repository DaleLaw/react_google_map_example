import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, withProps, lifecycle } from 'recompose';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';

const ContainerElement = styled.div`
  display: inline-block;
  width: calc(100% - 300px);
  height: 100%;
`;

// Due to Google Maps restriction, Map Element has to be a dom element, not a react component
const mapElement = <div style={{ height: '100%' }} />;

/*
 * A Higher Order Component that provide props for the Google Map Element
*/
export const enhance = compose(
  withProps({
    containerElement: <ContainerElement />,
    mapElement,
  }),
  lifecycle({
    componentWillMount() {
      this.setState({
        bounds: null,
        markers: [],
        onMapMounted: (ref) => {
          this.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: this.map.getBounds(),
            center: this.map.getCenter(),
          });
        },
      });
    },
    /* eslint-disable no-undef */
    componentWillReceiveProps(nextProps) {
      if (nextProps.path) {
        const path = nextProps.path;
        const origin = new window.google.maps.LatLng(path[0][0], path[0][1]);
        const destination = new window.google.maps.LatLng(path[path.length - 1][0], path[path.length - 1][1]);
        const waypoints = path.slice(1, path.length - 1).map((l) => ({
          location: new window.google.maps.LatLng(l[0], l[1]),
          stopover: true,
        }));
        const DirectionsService = new window.google.maps.DirectionsService();
        DirectionsService.route({
          origin,
          waypoints,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              ...this.state,
              directions: result,
              markers: [],
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      } else if (nextProps.locations) {
        const markers = nextProps.locations
          .filter((l) => l != null)
          .map((l) => (l.location));

        this.setState({
          ...this.state,
          markers,
          directions: null,
        });
      } else {
        this.setState({
          ...this.state,
          directions: null,
          markers: [],
        });
      }
      /* eslint-enable no-undef */
    },
  }),
  withGoogleMap
);

export const MyGoogleMap = (props) => (
  <GoogleMap
    ref={props.onMapMounted}
    onBoundsChanged={props.onBoundsChanged}
    defaultZoom={11}
    center={props.center}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    {props.markers.map((marker, index) => (
      <Marker key={index} position={marker} />
    ))}
  </GoogleMap>
);
MyGoogleMap.propTypes = {
  onMapMounted: PropTypes.func,
  onBoundsChanged: PropTypes.func,
  center: PropTypes.object.isRequired,
  directions: PropTypes.object,
  markers: PropTypes.array,
};

export default enhance(MyGoogleMap);


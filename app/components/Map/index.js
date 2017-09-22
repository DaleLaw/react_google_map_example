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
      const refs = {};

      this.setState({
        bounds: null,
        markers: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
      });
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
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
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


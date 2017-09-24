/*
 * HomePage
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Map from 'components/Map';
import SideMenu from 'components/SideMenu';
import connectGoogleMap from './connectGoogleMap';
import { makeSelectLocations, makeSelectRoute, makeSelectError } from './selectors';
import { addLocation, selectLocation, removeLocation } from './actions';

export const Container = styled.div`
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export class HomePage extends React.PureComponent {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired,
    error: PropTypes.string,
    addLocation: PropTypes.func.isRequired,
    removeLocation: PropTypes.func.isRequired,
    selectLocation: PropTypes.func.isRequired,
  }
  onClickAddLocation = () => {
    this.props.addLocation();
  }

  onSuggestSelect = (index, location) => {
    this.props.selectLocation(index, location);
  }

  onClickRemove = (index) => {
    this.props.removeLocation(index);
  }

  render() {
    const { locations, route, error } = this.props;
    return (
      <Container>
        <SideMenu
          onClickAddLocation={this.onClickAddLocation}
          onSuggestSelect={this.onSuggestSelect}
          onClickRemove={this.onClickRemove}
          locations={locations}
          message={error}
        />
        <Map
          center={{ lat: 22.2896868, lng: 114.19389 }}
          locations={locations}
          path={route.path}
          {...this.props}
        />
      </Container>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations(),
  route: makeSelectRoute(),
  error: makeSelectError(),
});

export const mapDispatchToProps = (dispatch) => ({
  dispatch,
  addLocation: () => dispatch(addLocation()),
  selectLocation: (i, location) => dispatch(selectLocation(i, location)),
  removeLocation: (i) => dispatch(removeLocation(i)),
});

export default connect(mapStateToProps, mapDispatchToProps)(connectGoogleMap(HomePage));

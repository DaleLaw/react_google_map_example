/*
 * HomePage
 */

import React from 'react';
import styled from 'styled-components';
import Map from 'components/Map';
import SideMenu from 'components/SideMenu';
import connectGoogleMap from './connectGoogleMap';

export const Container = styled.div`
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
`;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <SideMenu />
        <Map
          center={{ lat: 22.2896868, lng: 114.19389 }}
          {...this.props}
        />
      </Container>
    );
  }
}

export default connectGoogleMap(HomePage);

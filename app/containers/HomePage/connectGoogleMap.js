import React from 'react';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { withScriptjs } from 'react-google-maps';

const LoadingElement = styled.div`
  height: 100%;
  width: 100%;
`;
export const enhance = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <LoadingElement />,
  }),
  withScriptjs,
);

export default (Component) => enhance((props) =>
  <Component {...props} />
);

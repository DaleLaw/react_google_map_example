import React from 'react';
import { mount } from 'enzyme';
import connectGoogleMap from '../connectGoogleMap';

describe('<HomePage />', () => {
  it('should inject props googleMapURL', () => {
    const div = () => <div />;
    const Div = connectGoogleMap(div)();
    const com = mount(
      Div
    );
    expect(com.props().googleMapURL).toEqual('https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places');
  });
});

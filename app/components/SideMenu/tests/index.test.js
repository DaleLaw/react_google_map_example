import React from 'react';
import { shallow } from 'enzyme';
import SideMenu, { Menu } from '../index';

const mockLatLng = jest.fn(() => ({ lat: jest.fn(() => 10), lng: jest.fn(() => 20) }));
const mockGoogle = {
  maps: {
    LatLng: mockLatLng,
  },
};
global.google = mockGoogle;

describe('<SideMenu />', () => {
  it('should render StyledGeosuggest', () => {
    const generatedComponent = shallow(
      <SideMenu />
    );
    expect(generatedComponent.type()).toEqual(Menu);
  });
});

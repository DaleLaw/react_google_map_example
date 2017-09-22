import React from 'react';
import { shallow, mount } from 'enzyme';
import Map, { MyGoogleMap } from '../index';
const mockSetZoom = jest.fn();
const mockSetCenter = jest.fn();
const mockGetBounds = jest.fn(() => ('bounds'));
const mockGetCenter = jest.fn(() => ({ lat: jest.fn(() => 10), lng: jest.fn(() => 20) }));
const mockGoogle = {
  maps: {
    LatLngBounds: jest.fn(),
    Map: jest.fn(() => ({
      setZoom: mockSetZoom,
      setCenter: mockSetCenter,
      getBounds: mockGetBounds,
      getCenter: mockGetCenter,
    })),
    event: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
};
global.google = mockGoogle;

describe('<Map />', () => {
  const generateComponent = (props = {}, renderMethod = shallow) => renderMethod(
    <Map
      center={{ lat: jest.fn(() => 10), lng: jest.fn(() => 20) }}
      {...props}
    />
  );
  it('should render Map', () => {
    const com = generateComponent(null, mount);
    expect(com.find(Map).length).toEqual(1);
  });

  it('should call getBounds and getCenter in onBoundChanged', () => {
    const com = generateComponent(null, mount);
    com.find(MyGoogleMap).props().onBoundsChanged();
    expect(mockGetBounds).toHaveBeenCalledTimes(1);
    expect(mockGetCenter).toHaveBeenCalledTimes(1);
  });
});

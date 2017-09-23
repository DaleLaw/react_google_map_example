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
  const mockOnClickAddLocation = jest.fn();
  const mockOnSuggestSelect = jest.fn();
  const mockOnClickRemove = jest.fn();
  const generateComponent = (props = {}, renderMethod = shallow) => renderMethod(
    <SideMenu
      onClickAddLocation={mockOnClickAddLocation}
      onSuggestSelect={mockOnSuggestSelect}
      onClickRemove={mockOnClickRemove}
      locations={[null, null, null]}
      {...props}
    />
  );

  it('should render Menu', () => {
    const com = generateComponent();
    expect(com.type()).toEqual(Menu);
  });

  describe('renderSearchBox()', () => {
    it('should return correctly(start location case)', () => {
      const com = generateComponent();
      const searchBox = com.instance().renderSearchBox(null, 0);
      expect(searchBox.key).toEqual('0');
      expect(searchBox.props.placeholder).toEqual('Start location');
    });

    it('should return correctly(drop-off location case)', () => {
      const com = generateComponent();
      const searchBox = com.instance().renderSearchBox(null, 2);
      expect(searchBox.key).toEqual('2');
      expect(searchBox.props.placeholder).toEqual('Drop-off location');
    });

    it('should return correctly(intermedia location case)', () => {
      const com = generateComponent();
      const searchBox = com.instance().renderSearchBox(null, 1);
      expect(searchBox.key).toEqual('1');
      expect(searchBox.props.placeholder).toEqual('Intermediate location');
    });

    it('should return correctly(defined location case)', () => {
      const com = generateComponent();
      const searchBox = com.instance().renderSearchBox({
        label: 'Testing Location',
      }, 1);
      expect(searchBox.key).toEqual('1');
      expect(searchBox.props.value).toEqual('Testing Location');
    });

    it('should call onSuggestSelect', () => {
      mockOnSuggestSelect.mockReset();
      const com = generateComponent();
      const searchBox = com.instance().renderSearchBox(null, 0);
      searchBox.props.onSuggestSelect();
      expect(mockOnSuggestSelect).toHaveBeenCalledTimes(1);
    });

    it('should call onClickRemove', () => {
      mockOnClickRemove.mockReset();
      const com = generateComponent();
      const searchBox = com.instance().renderSearchBox(null, 0);
      searchBox.props.onClickRemove();
      expect(mockOnClickRemove).toHaveBeenCalledTimes(1);
    });
  });
});

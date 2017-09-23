import 'jest-styled-components';
import React from 'react';
import { shallow, mount } from 'enzyme';
import LocationSearchBox, { Wrapper, StyledGeosuggest, RemoveButton } from '../index';

describe('<LocationSearchBox />', () => {
  const generateComponent = (props = {}, renderMethod = shallow) => renderMethod(
    <LocationSearchBox
      onSuggestSelect={jest.fn()}
      placeholder={'Test Placeholder'}
      location={{ lat: jest.fn(() => 10), lng: jest.fn(() => 20) }}
      onClickRemove={jest.fn()}
      removable
      {...props}
    />
  );
  it('should render Wrapper', () => {
    const generatedComponent = generateComponent();
    expect(generatedComponent.type()).toEqual(Wrapper);
  });

  it('should change StyledGeosuggest width according to removable', () => {
    const com = shallow(<StyledGeosuggest rightButtonVisible />);
    expect(com).toHaveStyleRule('width', 'calc(100% - 44px)');
    const com2 = shallow(<StyledGeosuggest rightButtonVisible={false} />);
    expect(com2).toHaveStyleRule('width', '100%');
  });

  it('should hide remove button if not removable', () => {
    const com = generateComponent({
      removable: false,
    });
    expect(com.find(RemoveButton).length).toEqual(0);
  });

  it('should call onClickRemove when remove button is clicked', () => {
    const mockCallback = jest.fn();
    const generatedComponent = generateComponent({
      onClickRemove: mockCallback,
    }, mount);
    generatedComponent.find(RemoveButton).simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

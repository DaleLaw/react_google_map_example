import React from 'react';
import { shallow } from 'enzyme';
import LocationSearchBox, { Wrapper, RemoveButton } from '../index';

describe('<LocationSearchBox />', () => {
  const generateComponent = (props = {}) => shallow(
    <LocationSearchBox
      onSuggestSelect={jest.fn()}
      placeholder={'Test Placeholder'}
      location={{ lat: jest.fn(() => 10), lng: jest.fn(() => 20) }}
      onClickRemove={jest.fn()}
      {...props}
    />
  );
  it('should render Wrapper', () => {
    const generatedComponent = generateComponent();
    expect(generatedComponent.type()).toEqual(Wrapper);
  });

  it('should call onClickRemove when remove button is clicked', () => {
    const mockCallback = jest.fn();
    const generatedComponent = generateComponent({
      onClickRemove: mockCallback,
    });
    generatedComponent.find(RemoveButton).simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

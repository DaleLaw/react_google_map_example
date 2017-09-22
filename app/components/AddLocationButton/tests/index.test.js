import React from 'react';
import { shallow } from 'enzyme';
import AddLocationButton, { Button } from '../index';

describe('<AddLocationButton />', () => {
  it('should render Button', () => {
    const generatedComponent = shallow(
      <AddLocationButton
        onClick={jest.fn()}
      />
    );
    expect(generatedComponent.type()).toEqual(Button);
  });
  it('should trigger onClick when clicked', () => {
    const mockClick = jest.fn();
    const generatedComponent = shallow(
      <AddLocationButton
        onClick={mockClick}
      />
    );
    generatedComponent.simulate('click');
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});

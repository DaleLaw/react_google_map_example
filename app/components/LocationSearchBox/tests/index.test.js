import React from 'react';
import { shallow } from 'enzyme';
import LocationSearchBox, { StyledGeosuggest } from '../index';

describe('<LocationSearchBox />', () => {
  it('should render StyledGeosuggest', () => {
    const generatedComponent = shallow(
      <LocationSearchBox
        onSuggestSelect={jest.fn()}
        placeholder={'Test Placeholder'}
        location={{ lat: jest.fn(() => 10), lng: jest.fn(() => 20) }}
      />
    );
    expect(generatedComponent.type()).toEqual(StyledGeosuggest);
  });
});

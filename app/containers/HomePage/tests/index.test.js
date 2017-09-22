import React from 'react';
import { shallow } from 'enzyme';
import { HomePage, Container } from '../index';


describe('<HomePage />', () => {
  it('should render Container', () => {
    const renderedComponent = shallow(
      <HomePage />
    );
    expect(renderedComponent.type()).toEqual(Container);
  });
});

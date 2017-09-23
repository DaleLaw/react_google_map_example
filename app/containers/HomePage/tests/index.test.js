import React from 'react';
import { shallow } from 'enzyme';
import { addLocation, selectLocation, removeLocation } from '../actions';
import { HomePage, Container, mapDispatchToProps } from '../index';


describe('<HomePage />', () => {
  const mockAddLocation = jest.fn();
  const mockRemoveLocation = jest.fn();
  const mockSelectLocation = jest.fn();
  const generateComponent = (props = {}, renderMethod = shallow) => renderMethod(
    <HomePage
      addLocation={mockAddLocation}
      removeLocation={mockRemoveLocation}
      onClickRemove={mockRemoveLocation}
      selectLocation={mockSelectLocation}
      locations={[null, null, null]}
      {...props}
    />
  );

  it('should render Container', () => {
    const renderedComponent = generateComponent();
    expect(renderedComponent.type()).toEqual(Container);
  });

  it('onClickRemove()', () => {
    const renderedComponent = generateComponent();
    renderedComponent.instance().onClickRemove();
    expect(mockRemoveLocation).toHaveBeenCalledTimes(1);
  });

  it('onSuggestSelect()', () => {
    const renderedComponent = generateComponent();
    renderedComponent.instance().onSuggestSelect();
    expect(mockRemoveLocation).toHaveBeenCalledTimes(1);
  });

  it('onClickAddLocation()', () => {
    const renderedComponent = generateComponent();
    renderedComponent.instance().onClickAddLocation();
    expect(mockRemoveLocation).toHaveBeenCalledTimes(1);
  });

  describe('mapDispatchToProps', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.addLocation).toBeDefined();
      expect(result.selectLocation).toBeDefined();
      expect(result.removeLocation).toBeDefined();
    });

    it('should dispatch addLocation', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.addLocation();
      expect(dispatch).toHaveBeenCalledWith(addLocation());
    });

    it('should dispatch selectLocation', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.selectLocation(0, {});
      expect(dispatch).toHaveBeenCalledWith(selectLocation(0, {}));
    });

    it('should dispatch removeLocation', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.removeLocation(0);
      expect(dispatch).toHaveBeenCalledWith(removeLocation(0));
    });
  });
});

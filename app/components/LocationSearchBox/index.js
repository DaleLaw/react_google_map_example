import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Geosuggest from 'react-geosuggest';

export const Wrapper = styled.div`
  background: white;
  boxSizing: border-box;
  border: 1px solid transparent;
  width: 240px;
  height: 44px;
  margin: 8px auto 8px auto;
  borderRadius: 3px;
  boxShadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

export const RemoveButton = styled.button`
  display: inline-block;
  color: grey;
  width: 44px;
  height: 44px;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #008CBA
    transition-duration: 0.4s;
  }
`;

const StyledGeosuggest = styled(Geosuggest)`
  display: inline-block;
  width: calc(100% - 44px);

  & input {
    vertical-align: center;
    width: 100%;
    height: 44px;
    line-height: 44px; 
    padding: 0 12px;
    fontSize: 14px;
    textOverflow: ellipses;
    outline: none;
  }

  & .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
  }

  & .geosuggest__suggests {
    position: absolute;
    background: white;
    color: grey;
    list-style: none;
    width: 240px;
    margin-top: 0px;
    padding: 0px;
    z-index: 1;
    boxShadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  & .geosuggest__item {
    padding: .5em .65em;
  }

  & .geosuggest__item:hover {
    background-color: #008CBA;
    color: white
    transition-duration: 0.4s;
  }
`;

class LocationSearchBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onSuggestSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    onClickRemove: PropTypes.func.isRequired,
  }

  render() {
    const { onSuggestSelect, placeholder, location, onClickRemove } = this.props;
    return (
      <Wrapper>
        <StyledGeosuggest
          type={'text'}
          placeholder={placeholder}
          onSuggestSelect={onSuggestSelect}
          location={location}
          radius="20"
        />
        <RemoveButton
          title={'Remove Location'}
          onClick={() => onClickRemove()}
        >
          X
        </RemoveButton>
      </Wrapper>
    );
  }
}

export default LocationSearchBox;

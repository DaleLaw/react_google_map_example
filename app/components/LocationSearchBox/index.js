import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Geosuggest from 'react-geosuggest';

export const StyledGeosuggest = styled(Geosuggest)`
  & input {
    fontSize: 14px;
    display: block;
    background: white;
    boxSizing: border-box;
    border: 1px solid transparent;
    width: 240px;
    height: 44px;
    margin: 8px auto 8px auto;
    padding: 0 12px;
    borderRadius: 3px;
    boxShadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    outline: none;
    textOverflow: ellipses;
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
    width: 244px;
    margin-top: 0px;
    margin-left: 28px;
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
  }

  render() {
    const { onSuggestSelect, placeholder, location } = this.props;
    return (
      <StyledGeosuggest
        type={'text'}
        placeholder={placeholder}
        onSuggestSelect={onSuggestSelect}
        location={location}
        radius="20"
      />
    );
  }
}

export default LocationSearchBox;

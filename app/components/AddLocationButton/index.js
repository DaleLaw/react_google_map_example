import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Button = styled.button`
  display: block;
  font-size: 12px;
  background-color: white;
  color: black;
  border: 2px solid #008CBA;
  border-radius: 4px;
  padding: 8px 10px;
  margin: 8px auto 8px auto;
  &:hover {
    background-color: #008CBA;
    color: white
  }
  transition-duration: 0.4s;
  cursor: pointer;
  outline: none;
`;

const AddLocationButton = (props) => (
  <Button onClick={() => props.onClick()}>
    + Add intermediate location
  </Button>
);
AddLocationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddLocationButton;

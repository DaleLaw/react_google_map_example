import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LocationSearchBox from 'components/LocationSearchBox';
import AddLocationButton from 'components/AddLocationButton';

export const Menu = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 300px;
  height: 100%;
  background: white;
  boxShadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  overflow: scroll;
`;

class SideMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onClickAddLocation: PropTypes.func.isRequired,
    onSuggestSelect: PropTypes.func.isRequired,
    onClickRemove: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
  }

  renderSearchBox = (item, i) => {
    const { onSuggestSelect, onClickRemove, locations } = this.props;
    let placeholder;
    let label;
    const removable = locations.length > 2;
    if (i === 0) {
      placeholder = 'Start location';
    } else if (i === locations.length - 1) {
      placeholder = 'Drop-off location';
    } else {
      placeholder = 'Intermediate location';
    }
    if (item) {
      label = item.label;
    }

    return (<LocationSearchBox
      key={i}
      value={label}
      placeholder={placeholder}
      onSuggestSelect={(location) => onSuggestSelect(i, location)}
      onClickRemove={() => onClickRemove(i)}
      removable={removable}
      location={new window.google.maps.LatLng(22.2896868, 114.19389)} // eslint-disable-line no-undef
    />);
  }

  render() {
    const { onClickAddLocation, locations } = this.props;
    return (
      <Menu>
        <AddLocationButton onClick={onClickAddLocation} />
        { locations.map(this.renderSearchBox) }
      </Menu>
    );
  }
}

export default SideMenu;

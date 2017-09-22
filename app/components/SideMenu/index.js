import React from 'react';
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
`;

class SideMenu extends React.PureComponent {
  static propTypes = {
  }

  static defaultProps = {
  }

  onClickAddLocation = () => {

  }

  onSuggestSelect = () => {

  }

  render() {
    return (
      <Menu>
        <LocationSearchBox
          placeholder={'Pickup location'}
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(22.2896868, 114.19389)} // eslint-disable-line no-undef
        />
        <LocationSearchBox
          placeholder={'Destination'}
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(22.2896868, 114.19389)} // eslint-disable-line no-undef
        />
        <AddLocationButton onClick={this.onClickAddLocation} />
      </Menu>
    );
  }
}

export default SideMenu;

import React, { PureComponent } from 'react';
import Icon from '../Icon';

class Button extends PureComponent {

  onPress() {
    const { navigation, goBack } = this.props;
    navigation && navigation.goBack();
    goBack && goBack();
  }

  render() {
    return (
      <Icon 
        style={{paddingLeft: 16, paddingRight: 16, fontSize: 32, color: "#999"}}
        name="md-close" //name="md-arrow-round-back" 
        onPress={() => this.onPress() } 
      />
    );
  }
};

export default Button;
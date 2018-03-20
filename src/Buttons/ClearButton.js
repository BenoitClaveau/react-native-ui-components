import React, { PureComponent } from 'react';
import Icon from '../Icon';

class Button extends PureComponent {

  onPress() {
    const { clear } = this.props;
    clear && clear();
  }

  render() {
    return (
      <Icon 
        style={{paddingLeft: 16, paddingRight: 16, fontSize: 32, color: "#999"}}
        name="ios-trash-outline" 
        onPress={() => this.onPress() } 
      />
    );
  }
};

export default Button;
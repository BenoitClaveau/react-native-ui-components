import React, { PureComponent } from 'react';
import Icon from '../Icon';
import { PRIMARY_COLOR } from '../styles';

class Button extends PureComponent {

  onPress() {
    const { validate } = this.props;
    validate && validate();
  }

  render() {
    return (
      <Icon 
        style={{paddingLeft: 16, paddingRight: 16, fontSize: 32, color: PRIMARY_COLOR }}
        name="md-checkmark" 
        onPress={() => this.onPress() } 
      />
    );
  }
};

export default Button;
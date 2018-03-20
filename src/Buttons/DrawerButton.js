import React, { PureComponent } from 'react';
import Icon from '../Icon';

class Button extends PureComponent {
  render() {
    const { isOpen, navigate: {navigation: navigate}} = this.props;
    if(isOpen)
      return <Icon name="close" onPress={() => navigate("DrawerClose")} />;
    return <Icon name="menu" onPress={() => navigate("DrawerOpen")} />;
  }
};

export default Button;
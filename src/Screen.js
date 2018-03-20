import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { screen } from './styles';

class Screen extends PureComponent {

  render() {
    const { 
      children,
      style,
      ...others
    } = this.props;

    return (
      <View 
        style={[screen.container, style]}
        {...others}
      >
        {children}
      </View>
    )
  }
};

export default Screen;
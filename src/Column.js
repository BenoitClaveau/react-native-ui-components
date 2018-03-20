import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { flexColumn } from './styles';

class Column extends PureComponent {

  render() {
    const { 
      children,
      style,
      ...others
    } = this.props;

    return (
      <View 
        style={[flexColumn, style]}
        {...others}
      >
        {children}
      </View>
    )
  }
};

export default Column;
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { row } from './styles';

class Row extends PureComponent {

  render() {
    
    return (
       <View style={[row, this.props.style]}>{this.props.children}</View>
    )
  }
};

export default Row;
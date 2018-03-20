import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { text } from './styles';

class MyText extends PureComponent {

  render() {
    const { style, nopadding } = this.props;
    let ext = {};
    if (nopadding) ext = { paddingTop: 0, paddingBottom: 0}
    return (
       <Text style={[text, style, ext]}>{this.props.children}</Text>
    )
  }
};

export default MyText;
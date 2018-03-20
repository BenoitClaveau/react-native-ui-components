import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { title } from './styles';

class Title extends PureComponent {

  render() {
    const { name, onPress, style } = this.props;
    if (onPress) {
      return (
        <TouchableOpacity style={[title.container, style]}>
          <Text style={title.text}>{this.props.children}</Text>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <View style={[title.container, style]}>
          <Text style={title.text}>{this.props.children}</Text>
        </View>
      )
    }
  }
};

export default Title;
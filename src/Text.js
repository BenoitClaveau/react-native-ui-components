import React, { PureComponent } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text, 
  View 
} from 'react-native';
import { 
  TEXT_FONT_SIZE,
  TEXT_COLOR
} from './theme';

class MyText extends PureComponent {

  render() {
    const { style } = this.props;
    return (
       <Text style={[styles.text, style]}>{this.props.children}</Text>
    )
  }
};

const styles = StyleSheet.create({
  text: {
    paddingHorizontal : 16,
    fontSize: TEXT_FONT_SIZE,
    color: TEXT_COLOR,
    fontWeight: "500"
  }
});

export default MyText;
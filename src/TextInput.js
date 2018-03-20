import React, { PureComponent } from 'react';
import { TextInput, View } from 'react-native';
import { textinput } from './styles';

class MyTextInput extends PureComponent {

  render() {
    const { style } = this.props;
    return (
      <TextInput
          underlineColorAndroid={"transparent"}
          {...this.props}
          style={[textinput.container, style]}
      />
    );
  }
};

export default MyTextInput;
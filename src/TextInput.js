import React, { PureComponent } from 'react';
import { 
  StyleSheet,
  TextInput, 
  View 
} from 'react-native';
import { 
  INPUT_BACKGROUND_COLOR,
  INPUT_FONT_SIZE,
  PRIMARY_COLOR
} from './theme';

class MyTextInput extends PureComponent {

  state = {
  }

  render() {
    const { style, ...others } = this.props;

    return (
      <View style={styles.container}>
        <TextInput
            underlineColorAndroid={"transparent"}
            {...others}
            style={[styles.input, style]}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  input: {
    backgroundColor: INPUT_BACKGROUND_COLOR,
    fontSize: INPUT_FONT_SIZE,
    color: PRIMARY_COLOR,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontWeight: "600",
    height: 48,
    flexGrow: 1
  },
});

export default MyTextInput;
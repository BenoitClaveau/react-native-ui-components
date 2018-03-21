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

  static getDerivedStateFromProps(props, state) {
    return {
        maxHeight: props.maxHeight || 48,
    }
  }

  state = {
    height: 22
  }

  render() {
    const { maxHeight, height } = this.state;
    const { style } = this.props;

    return (
      <TextInput
          underlineColorAndroid={"transparent"}
          onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height })
          }}
          {...this.props}
          style={[styles.container, style, { height: Math.max(maxHeight, height) }]}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: INPUT_BACKGROUND_COLOR,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: "600"
  },
  text: {
    fontSize: INPUT_FONT_SIZE,
    color: PRIMARY_COLOR,
    fontWeight: "600"
  },
});

export default MyTextInput;
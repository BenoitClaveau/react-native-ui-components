import React, { PureComponent } from 'react';
import { 
  StyleSheet,
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  FlatList, 
  TouchableOpacity, 
  InteractionManager, 
  Keyboard,
  Dimensions
} from 'react-native';
import Modal from './model';
import { 
  INPUT_FONT_SIZE,
  TEXT_COLOR
} from './theme';

const window = Dimensions.get('window');

class TextEditor extends PureComponent {

  static getDerivedStateFromProps(props, state) {
    return {
        text: props.text,
    }
  }

  state = {
    height: 0,
    keyboardShow: false
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        this.setState({keyboardShow: true})
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        this.setState({keyboardShow: false})
    });
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const { height } = this.state;
    const { title, style, ...others } = this.props;
    
    return (
      <Modal>
        <TextInput 
          ref={ref => this.textinput = ref}
          multiline={true}
          autoFocus={true}
          autoGrow={true}
          underlineColorAndroid={"transparent"}
          {...others}
          style={[styles.textinput, { height: height }]}
        />
      </Modal>
    )
  }
};

const styles = StyleSheet.create({
  textinput: {
    backgroundColor: "#FFF",
    paddingHorizontal : 16,
    fontSize: INPUT_FONT_SIZE,
    fontWeight: "600",
    textAlignVertical: "top",
    color: TEXT_COLOR
  }
});

export default TextEditor;
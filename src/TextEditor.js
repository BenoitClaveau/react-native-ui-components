import React, { PureComponent } from 'react';
import { View, Text, TextInput, ScrollView, Modal, FlatList, TouchableOpacity, InteractionManager, Keyboard } from 'react-native';
import Toolbar from './Toolbar';
import RootSiblings from 'react-native-root-siblings';
import { texteditor, toolbar } from './styles';

class TextEditor extends PureComponent {

  static dialogs = [];

  static open(props) {
    const dialog = new RootSiblings(
      <TextEditor
        {...props}
        modalVisible={true}
        onEndEditing={(event) => { 
          props.onEndEditing(event);
          this.destroy();
        }}
        goBack={() => {
          this.destroy();
        }}
      />
    );
    this.dialogs.push(dialog);
  }

  static destroy() {
    const dialog = this.dialogs.pop();
    setImmediate(() => {
      dialog.destroy();
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible,
      value: this.props.value,
      keyboardShow: false
    };
  }

  componentWillMount () {
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
  
  open() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ modalVisible: true });
    });
  }

  close() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ modalVisible: false });
    });
  }

  goBack() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ modalVisible: false });
      this.props.goBack && this.props.goBack();
    });
  }

  render() {
    const { title, onEndEditing, style, placeholder } = this.props;
    
    return (
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View 
            style={{flex:1}}
            onLayout={(ev) => {
              var fullHeight = ev.nativeEvent.layout.height - toolbar.container.height;
              this.setState({ height: fullHeight, fullHeight: fullHeight});
            }}
          >

            <Toolbar
              goBack={() => this.goBack()}
              title={title}
              clear={() => this.textinput.clear()}
              validate={() => this.textinput.blur()}
            />

            <ScrollView keyboardDismissMode='interactive'>
              <TextInput 
                ref={ref => this.textinput = ref}
                multiline={true}
                onChangeText={(text) => {
                  this.state.value = text;
                }}
                onEndEditing={onEndEditing}
                defaultValue={this.state.value}
                placeholder={placeholder}
                autoFocus={true}
                autoGrow={true}
                underlineColorAndroid={"transparent"}
                style={[texteditor.textinput, { height: this.state.height }]}

              />
            </ScrollView>
          </View> 
        </Modal>
    )
  }
};

export default TextEditor;
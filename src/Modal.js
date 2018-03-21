import React, { PureComponent } from 'react';
import { 
  StyleSheet,
  View, 
  ScrollView, 
  Modal, 
} from 'react-native';
import Toolbar from './Toolbar';

class MyModal extends PureComponent {

  static getDerivedStateFromProps(props, state) {
    return {
        modalVisible: props.modalVisible,
    }
  }

  state = {
  }
  
  open() {
    const { onOpen } = this.props;
    this.setState({ modalVisible: true });
    onOpen && onOpen();
  }

  close() {
    const { onClose } = this.props;
    this.setState({ modalVisible: false });
    onClose && onClose();
  }

  render() {

    const { 
      children,
      renderPlaceholder,
      ...others
    } = this.props;
    
    return (
      <View>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.close()}
        >
          <View style={{flex:1}}>
            <Toolbar
              {...others}
              goBack={() => this.close()}
            />
            { children }
          </View>
        </Modal>
        { renderPlaceholder &&
        <TouchableOpacity
          onPress={() => this.open()}
        >
          { renderPlaceholder() }
        </TouchableOpacity>
        }
      </View>
    )
  }
};

export default MyModal;
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
    this.setState({ modalVisible: true });
  }

  close() {
    this.setState({ modalVisible: false });
  }

  render() {
    const { children } = this.props;

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
              goBack={() => this.close()}
              title={title}
            />
            { children }
          </View>
        </Modal>
      </View>
    )
  }
};

export default MyModal;
import React, { PureComponent } from 'react';
import { 
  StyleSheet,
  View, 
  Text, 
  ScrollView, 
  Modal, 
  FlatList, 
  TouchableOpacity, 
  InteractionManager, 
  Keyboard 
} from 'react-native';
import Toolbar from './Toolbar';
import List from './List';
import Button from './Button';
import { 
  INPUT_BACKGROUND_COLOR,
} from './theme';

class ComboBox extends PureComponent {

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

  onSelect(item, index) {
    const { onSelect } = this.props;
      this.setState({ modalVisible: false });
      onSelect && onSelect(item, index);
  }

  render() {
    const { placeholder, selected } = this.props;
    const placeholder = getPlaceholder(selected, styles);
    
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
            <List 
              data={data || []}
              keyExtractor={keyExtractor}
              refreshing={refreshing}
              waiting={waiting}
              refresh={refresh}
              loadMore={loadMore}
              onSelect={(item, index) => this.onSelect(item, index)}
              renderItem={renderItem}
            />
          </View> 
        </Modal>

        <TouchableOpacity
          style={styles.container}
          onPress={() => this.open()}
        >
          { placeholder }
        </TouchableOpacity>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 54,
    backgroundColor: INPUT_BACKGROUND_COLOR,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  text: {
    
  }
});

export default ComboBox;
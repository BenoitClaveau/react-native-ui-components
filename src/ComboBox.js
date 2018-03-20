import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Modal, FlatList, TouchableOpacity, InteractionManager, Keyboard } from 'react-native';
import Toolbar from './Toolbar';
import List from './List';
import Button from './Button';
import { autocomplete } from './styles';

class ComboBox extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  
  open() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ modalVisible: true });
    });
  }

  onSelect(item, index) {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ modalVisible: false });
      this.props.onSelect(item, index);
    });
  }

  goBack() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ modalVisible: false });
    });
  }

  render() {
    const { data, refreshing, refresh, waiting, placeholder, getLabel, selected, loadMore, title, renderItem, keyExtractor } = this.props;
    const buttonText = selected ? getLabel(selected) : placeholder;
    
    return (
      <View>

        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View style={{flex:1}}>
            <Toolbar
              goBack={() => this.goBack()}
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
          style={autocomplete.inputContainer}
          onPress={() => this.open()}
        >
          <Text style={autocomplete.inputText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    )
  }
};

export default ComboBox;
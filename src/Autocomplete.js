import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  FlatList, 
  TouchableOpacity, 
  InteractionManager, 
  Keyboard 
} from 'react-native';
import Modal from './Modal';
import List from './List';
import TextInput from './TextInput';
import debounce from 'debounce';

class AutoComplete extends PureComponent {

  state = {
    modalVisible: 0,
    q: null
  }

  onChange(text) {
    if (!text) text = null;
    this.setState({q: text});
    this.debounceRefresh();
  }

  debounceRefresh = debounce(() => {
    this.props.refresh(this.state.q)
  }, 150)

  render() {
    const { 
      searchPlacehodler,
      renderPlaceholder,
      ...others
    } = this.props;
    
    if (!renderPlaceholder) throw new Error("renderPlaceholder is not defined.");

    return (
      <View>
        <Modal
          search={this.state.q}
          searchPlacehodler={searchPlacehodler}
          onSearchChange={text => this.onChange(text)}
          renderPlaceholder={renderPlaceholder}
        >
          <Select
            {...others}
          />
        </Modal>
      </View>
    )
  }
};

export default AutoComplete;
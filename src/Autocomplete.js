import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Modal, FlatList, TouchableOpacity, InteractionManager, Keyboard } from 'react-native';
import Toolbar from './Toolbar';
import Screen from './Screen';
import List from './List';
import TextInput from './TextInput';
import { autocomplete } from './styles';
import debounce from 'debounce';

class Autocomplete extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      q: null
    };
  }

  open() {
    this.setState({ modalVisible: true, q: null });
  }

  onSelect(item, index) {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ modalVisible: false, q: null });
      if (this.props.onSelect) this.props.onSelect(item, index);
    });
  }

  goBack() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ modalVisible: false, q: null });
      if (this.props.goBack) this.props.goBack();
    });
  }

  onChange(text) {
    if (!text) text = null;
    this.setState({q: text});
    this.debounceRefresh();
    if (this.clearTimeout) clearTimeout(this.clearTimeout)
    this.clearTimeout = setTimeout(() => {
      Keyboard.dismiss()
    }, 750)
  }

  debounceRefresh = debounce(() => {
    this.props.refresh(this.state.q)
  }, 100)

  refresh() {
    this.props.refresh(this.state.q)
  }

  loadMore() {
    this.props.loadMore(this.state.q)
  }

  render() {
    const { data, refreshing, waiting, placeholder, renderItem, keyExtractor, selected, getLabel, inputPlaceholder, renderMessage } = this.props;
    const buttonText = selected ? getLabel(selected) : placeholder;
    const items = this.state.q ? data : []; //Si pas de recherche la liste sera vide

    return (
      <View>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
         <View style={{flex: 1}}>
            <Toolbar
              goBack={() => this.goBack()}
              value={this.state.q}
              placeholder={inputPlaceholder}
              onChange={text => this.onChange(text)}
            /> 
{ this.state.q &&
            <List
              data={items}
              keyExtractor={keyExtractor}
              refreshing={refreshing}
              waiting={waiting}
              refresh={() => this.refresh()}
              loadMore={() => this.loadMore()}
              onSelect={(item, index) => this.onSelect(item, index)}
              renderItem={renderItem}
            />
}
{ !this.state.q && renderMessage &&
            renderMessage()
}
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

export default Autocomplete;
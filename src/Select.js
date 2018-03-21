import React, { PureComponent } from 'react';
import {
  StyleSheet,
  FlatList, 
  TouchableOpacity, 
} from 'react-native';

class Select extends PureComponent {

  render() {

    const { onPress, renderItem } = this.props;

    return (
      <FlatList
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        onEndReachedThreshold={1}
        renderItem={(...args) => {
          return (
            <TouchableOpacity
              underlayColor='transparent'
              onPress={() => onPress && onPress(...args)}
            >
              {renderItem && renderItem(...args)}
            </TouchableOpacity>
          )
        }}
      />
    );
  }
}

export default Select;
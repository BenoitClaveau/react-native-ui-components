import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { separator } from './styles';

class Item extends PureComponent {

  onSelect() {
    const { data, index } = this.props;
    this.props.onSelect(data, index);
  }

  render() {
    const { data, renderItem, onSelect } = this.props;

    if (!data) throw new Error(`data is not defined.`);
    if (!onSelect) throw new Error(`onSelect is not defined.`);

    return (
      <TouchableOpacity
        underlayColor='transparent'
        onPress={() => this.onSelect()}
      >
        <View>
          {renderItem(data)}
        </View>
      </TouchableOpacity>
    );
  }
}

class List extends PureComponent {

  renderItem({item, index}) {
    const { onSelect, renderItem } = this.props;

    if (!onSelect) throw new Error(`onSelect is not defined.`);

    return (
      <Item 
        data={item}
        index={index}
        onSelect={onSelect}
        renderItem={renderItem}
      />
    );
  }

  loadMore() {
    if (this.props.loadMore) this.props.loadMore();
  }

  refresh() {
    if (this.props.refresh) this.props.refresh();
  }

  render() {
    const { data, refreshing, waiting, keyExtractor, refresh, ItemSeparatorComponent, ListFooterComponent } = this.props;
    if (!keyExtractor) throw new Error(`keyExtractor is not defined.`);

    return (
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={(args) => this.renderItem(args)}
        onRefresh={() => this.refresh()}
        refreshing={refreshing}
        onEndReachedThreshold={1}
        onEndReached={() => this.loadMore()}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      />
    );
  }
}

//GENERATE a bug if the end of the list is reached
/* ListFooterComponent={() => {
          if (!waiting) return null;
          return (
            <View
              style={{
                paddingVertical: 10,
                backgroundColor: "#FFF"
              }}
            >
              <ActivityIndicator animating size="large" />
            </View>
          )
        }}*/

export default List;
import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { group } from './styles';

class Group extends PureComponent {

  renderItem(child, index, isLast) {
    const { style } = this.props;

    return (
      <View
        key={index} 
        style={[style, {paddingBottom: isLast ? 0 : 16}]}>
        {child}
      </View>
    )
  }

  render() {
    let { children, containerStyle } = this.props;
    if (!Array.isArray(children)) children = [children];
    const last = children.length - 1;
    return (
      <View style={[group.container, containerStyle]}>
        { children.map((child, index) => this.renderItem(child, index, index == last)) }
      </View>
    )
  }
};

export default Group;
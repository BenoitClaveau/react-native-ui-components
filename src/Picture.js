import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { picture } from './styles';

class Picture extends PureComponent {

  render() {
    const { 
      containerStyle,
      onPress,
      children,
      ...others
    } = this.props;


    if (onPress) {
      return (
        <TouchableOpacity
          style={[picture.container, containerStyle]}
          onPress={onPress}
        >
          <Image 
            {...others} 
          />
          {children}
        </TouchableOpacity>
      )
    }
    else {
      return (
        <View 
          style={[picture.container, containerStyle]}
        >
          <Image 
            {...others} 
          />
          {children}
        </View>
      )
    }
  }
};

export default Picture;
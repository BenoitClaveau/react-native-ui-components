import React, { PureComponent } from 'react';
import { 
  StyleSheet,
  View, 
  Image, 
  TouchableOpacity
} from 'react-native';

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
          style={[styles.container, containerStyle]}
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
          style={[styles.container, containerStyle]}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default Picture;
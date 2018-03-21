import React, { PureComponent } from 'react';
import { 
  StyleSheet,
  View 
} from 'react-native';

class Column extends PureComponent {

  render() {
    const { 
      children,
      style,
      ...others
    } = this.props;

    return (
      <View 
        style={[styles.column, style]}
        {...others}
      >
        {children}
      </View>
    )
  }
};

const styles = StyleSheet.create({
  column: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  }
});

export default Column;
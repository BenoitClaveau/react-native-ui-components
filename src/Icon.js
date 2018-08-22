import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class MyIcon extends PureComponent {

    render() {
        const { name, onPress, style } = this.props;

        const {
            fontSize,
            color,
            ...others
        } = StyleSheet.flatten(style) || {};

        if (onPress) {
            return (

                <TouchableOpacity
                    onPress={onPress}
                >
                    <View style={others}>
                        <Icon
                            size={fontSize || 24}
                            color={color || "#F00"}
                            name={name}
                        />
                    </View>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <View
                    style={others}
                >
                    <Icon
                        size={fontSize || 24}
                        color={color || "#F00"}
                        name={name}
                    />
                </View>
            )
        }
    }
};

export default MyIcon;
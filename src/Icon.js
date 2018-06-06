import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
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

                <TouchableNativeFeedback
                    onPress={onPress}
                    //background={TouchableNativeFeedback.SelectableBackground()}
                    background={TouchableNativeFeedback.Ripple('red')}
                    delayPressIn={0}
                >
                    <View style={others}>
                        <Icon
                            size={fontSize || 24}
                            color={color || "#000"}
                            name={name}
                        />
                    </View>
                </TouchableNativeFeedback>
            )
        }
        else {
            return (
                <View
                    style={others}
                >
                    <Icon
                        size={fontSize || 24}
                        color={color || "#000"}
                        name={name}
                    />
                </View>
            )
        }
    }
};

export default MyIcon;
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
                    style={[styles.container, others]}
                >
                    <Icon
                        size={fontSize || 24}
                        color={color || "#F00"}
                        name={name}
                    />
                </TouchableOpacity>
            )
        }
        else {
            return (
                <View style={[styles.container, others]}>
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

let styles = {};
export function createStyleSheet() {
    styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
        }
    });
};

export default MyIcon;
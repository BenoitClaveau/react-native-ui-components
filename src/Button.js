import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import theme from "./Theme";

class Button extends PureComponent {

    render() {
        const {
            disabled,
            children,
            style,
            onPress,
        } = this.props;

        if (onPress)
            return (
                <TouchableOpacity
                    style={[styles.container, style, { opacity: disabled ? 0.4 : 1 }]}
                    onPress={() => !disabled && onPress && onPress()}
                >
                    { children }
                </TouchableOpacity>
            )

        return (
            <View
                style={[styles.container, style, { opacity: disabled ? 0.4 : 1 }]}
            >
                { children }
            </View>
        )
    }
};

let styles = {};
export function createStyleSheet() {
    styles = StyleSheet.create({
        container: {
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.PRIMARY_COLOR,
            borderRadius: 32,
        },
    });
};

export default Button;
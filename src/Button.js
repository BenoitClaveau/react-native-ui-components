import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
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

        return (
            <TouchableOpacity
                style={[styles.container, style, { opacity: disabled ? 0.4 : 1 }]}
                onPress={() => !disabled && onPress && onPress()}
            >
                { children }
            </TouchableOpacity>
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
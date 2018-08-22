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

        if (disabled) 
            return (
                <View
                    style={[styles.container, style, { opacity: 0.4 }]}
                >
                    { children }
                </View>
            )
        
        if (onPress)
            return (
                <TouchableOpacity
                    style={[styles.container, style]}
                    onPress={() => onPress && onPress()}
                >
                    { children }
                </TouchableOpacity>
            )

        return (
            <View
                style={[styles.container, style]}
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
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import theme, { overrideStyle } from "./Theme";

class Title extends PureComponent {

    render() {
        const {
            name,
            onPress,
            style,
            children,
            ...others,
        } = this.props;

        const {
            fontSize,
            color,
            fontWeight,
            ...containerStyles
        } = style || {};

        if (onPress) {
            return (
                <TouchableOpacity 
                    style={[styles.container, containerStyles]}
                    onPress
                >
                    <Text 
                        style={overrideStyle(styles.text, { fontSize, fontWeight, color })}
                        {...others}
                    >{children}</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <View style={[styles.container, containerStyles]}>
                    <Text 
                        style={overrideStyle(styles.text, { fontSize, fontWeight, color })}
                        {...others}
                    >{children}</Text>
                </View>
            )
        }
    }
};

let styles = {};
export function createStyleSheet() {
    styles = StyleSheet.create({
        container: {
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            fontSize: theme.TITLE_FONT_SIZE,
            color: theme.PRIMARY_COLOR,
            fontWeight: "600"
        },
    });
};


export default Title;
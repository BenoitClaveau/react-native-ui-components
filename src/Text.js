import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import theme from "./Theme";

class MyText extends PureComponent {

    render() {
        const { 
            style, 
            children,
            onPress,
            containerStyles,
            widthOffset,
            ...others
        } = this.props;

        const text = (
            <Text 
                {...others}
                style={[styles.text, { 
                    width: widthOffset ? Dimensions.get("window").width - widthOffset : undefined,
                }, style]}
            >{children}</Text>
        );
        
        if (onPress) {
            return (
                <TouchableOpacity
                    style={containerStyles}
                    onPress={onPress}
                >
                { text }
                </TouchableOpacity>
            )
        }

        return text;
        
    }
};

let styles = {};
export function createStyleSheet() {
    styles = StyleSheet.create({
        text: {
            fontSize: theme.TEXT_FONT_SIZE,
            color: theme.TEXT_COLOR,
            padding: theme.PADDING,
            fontWeight: "500"
        }
    });
    console.log("[react-native-ui-components] Text createStyleSheet", styles);
};

export default MyText;
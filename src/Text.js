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
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
            paddingHorizontal,
            paddingVertical,
            padding,
            widthOffset,
            ...others
        } = this.props;

        const text = (
            <Text 
                {...others}
                style={[styles.text, { 
                    padding: padding ? theme.PADDING : undefined, 
                    paddingHorizontal: paddingHorizontal ? theme.PADDING : undefined, 
                    paddingVertical: paddingVertical ? theme.PADDING : undefined,
                    paddingTop: paddingTop ? theme.PADDING : undefined,
                    paddingBottom: paddingBottom ? theme.PADDING : undefined,
                    paddingLeft: paddingLeft ? theme.PADDING : undefined,
                    paddingRight: paddingRight ? theme.PADDING : undefined,
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
            fontWeight: "500"
        }
    });
    console.log("[react-native-ui-components] Text createStyleSheet", styles);
};

export default MyText;
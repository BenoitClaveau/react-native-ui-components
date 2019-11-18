import React, { PureComponent } from 'react';
import {
    TouchableOpacity,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import Theme, { createStyleSheet } from "./Theme";

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

        const width = widthOffset ? Dimensions.get("window").width - widthOffset : null;

        const text = (
            <Text 
                {...others}
                style={[styles.text, { 
                    width
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

let styles = createStyleSheet(()=> {
    styles = StyleSheet.create({
        text: {
            fontSize: Theme.TEXT_FONT_SIZE,
            color: Theme.TEXT_COLOR,
            fontWeight: "500"
        }
    });
    console.log("[react-native-ui-components] Text createStyleSheet", styles);
});

export default MyText;
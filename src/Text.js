import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import theme, { overrideStyle } from "./Theme";

class MyText extends PureComponent {

    render() {
        const { 
            style, 
            children,
            ...others,
        } = this.props;
        
        return (
            <Text
                style={overrideStyle(styles.text, style)}
                {...others}
            >{children}</Text>
        )
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
};

export default MyText;
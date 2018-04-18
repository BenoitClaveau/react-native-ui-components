import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import theme from 'react-native-ui-theme';

class MyText extends PureComponent {

    render() {
        const { style, children } = this.props;
        return (
            <Text style={[styles.text, style]}>{children}</Text>
        )
    }
};

let style;
export function createStyleSheet() {
    styles = StyleSheet.create({
        text: {
            paddingHorizontal: 16,
            fontSize: TEXT_FONT_SIZE,
            color: TEXT_COLOR,
            fontWeight: "500"
        }
    });
};

export default MyText;
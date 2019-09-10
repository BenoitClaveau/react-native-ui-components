import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import Text from "./Text";
import theme from "./Theme";

class Title extends PureComponent {

    render() {
        const {
            children,
            style,
            ...others
        } = this.props;

        return (
            <Text
                {...others}
                style={[styles.text, style]}
            >{children}</Text>);
    }
};

let styles = {};
export function createStyleSheet() {
    styles = StyleSheet.create({
        text: {
            fontSize: theme.TITLE_FONT_SIZE,
            color: theme.PRIMARY_COLOR,
            fontWeight: "600"
        },
    });
};


export default Title;
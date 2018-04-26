import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import theme from "./Theme";

class MyTextInput extends PureComponent {

    state = {
    }

    render() {
        const { 
            style, 
            ...others 
        } = this.props;

        console.log(others)

        return (
            <TextInput
                style={[styles.input, style]}
                underlineColorAndroid={"transparent"}
                {...others}
            />
        );
    }
};

let styles = {};
export function createStyleSheet() {
    styles = StyleSheet.create({
        input: {
            flexDirection: "row", 
            backgroundColor: theme.INPUT_BACKGROUND_COLOR,
            paddingHorizontal: 16,
            borderRadius: 12,
            fontSize: theme.INPUT_FONT_SIZE,
            color: theme.PRIMARY_COLOR,
            fontWeight: "600",
            height: 56,
        },
    });
};

export default MyTextInput;
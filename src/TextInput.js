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

    open() {
        if (!this.textinput) return;
        this.textinput.open();
    }

    focus() {
        if (!this.textinput) return;
        this.textinput.focus();
    }

    blur() {
        if (!this.textinput) return;
        this.textinput.blur();
    }

    render() {
        const { 
            style, 
            ...others 
        } = this.props;

        return (
            <TextInput
                ref={ref => this.textinput = ref}
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
    console.log("[react-native-ui-components] TextInput createStyleSheet", styles);
};

export default MyTextInput;
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TextInput,
} from 'react-native';
import Modal from './Modal';
import theme from "./Theme";

class TextEditor extends PureComponent {

    static getDerivedStateFromProps(props, state) {
        return {
            text: props.text,
        }
    }

    state = {
    }

    open() {
        if (!this.modal) return;
        this.modal.open();
    }

    focus() {
        this.open();
    }

    blur() {
    }

    render() {
        const {
            title, 
            style, 
            ...others
        } = this.props;

        return (
            <Modal
                ref={ref => this.modal = ref}
            >
                <TextInput
                    ref={ref => this.textinput = ref}
                    multiline={true}
                    autoFocus={true}
                    autoGrow={true}
                    underlineColorAndroid={"transparent"}
                    {...others}
                    style={[styles.textinput, style]}
                />
            </Modal>
        )
    }
};

let styles = {};
export function createStyleSheet() {
    styles = StyleSheet.create({
        textinput: {
            backgroundColor: "#FFF",
            paddingHorizontal: 16,
            fontSize: theme.INPUT_FONT_SIZE,
            fontWeight: "600",
            textAlignVertical: "top",
            color: theme.TEXT_COLOR,
        }
    });
};

export default TextEditor;
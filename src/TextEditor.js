import React, { PureComponent } from 'react';
import {
    StyleSheet,
} from 'react-native';
import Modal from './Modal';
import {
    INPUT_FONT_SIZE,
    TEXT_COLOR
} from './theme';

class TextEditor extends PureComponent {

    static getDerivedStateFromProps(props, state) {
        return {
            text: props.text,
        }
    }

    state = {
    }

    render() {
        const { title, style, ...others } = this.props;

        return (
            <Modal>
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

let style;
export function createStyleSheet() {
    styles = StyleSheet.create({
        textinput: {
            backgroundColor: "#FFF",
            paddingHorizontal: 16,
            fontSize: INPUT_FONT_SIZE,
            fontWeight: "600",
            textAlignVertical: "top",
            color: TEXT_COLOR
        }
    });
};

export default TextEditor;
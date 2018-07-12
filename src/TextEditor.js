import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';
import Modal from './Modal';
import theme from "./Theme";
import Toolbar from './Toolbar';
import Icon from './Icon';

class TextEditor extends PureComponent {

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
            onValidate,
            ...others
        } = this.props;

        return (
            <Modal
                ref={ref => this.modal = ref}
            >
                <Toolbar
                    renderRightComponent={() => (
                        <Icon
                            style={styles.icon}
                            onPress={() => {
                                this.modal.close();
                                onValidate && onValidate();
                            }}
                            name="md-checkmark"
                        />
                    )}
                />
                <ScrollView
                    ref={ref => this.scrollview = ref}
                >
                    <TextInput
                        ref={ref => this.textinput = ref}
                        multiline={true}
                        autoFocus={true}
                        autoGrow={true}
                        underlineColorAndroid={"transparent"}
                        onContentSizeChange={({ nativeEvent: { contentSize: { width, height } } }) => {
                            this.scrollview && this.scrollview.scrollToEnd({animated: true});
                        }}
                        onFocus={() => {
                            this.scrollview && this.scrollview.scrollToEnd({animated: true});
                        }}
                        {...others}
                        style={[styles.textinput, style]}
                    />
                </ScrollView>
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
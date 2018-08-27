import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TextInput,
    ScrollView,
    Dimensions,
    View,
} from 'react-native';
import Modal from './Modal';
import Button from './Button';
import Text from './Text';
import theme from "./Theme";
import Icon from './Icon';

class TextEditor extends PureComponent {

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            value: nextProps.value
        };
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

    close() {
        this.modal.close();
        this.setState({ value: this.props.value });
    }

    validate() {
        const {
            onValidate,
            value,
        } = this.props;

        this.modal.close();
        if (onValidate) {
            const svalue = this.state.value;
            this.setState({ value: value });
            onValidate(svalue, svalue !== value);
        }
    }

    render() {
        const {
            style,
            value, //exclude from props
            onValidate, //exclude from props
            onChangeText,
            containerStyle,
            ...others
        } = this.props;

        const renderModalHeaderComponent = this.props.renderModalHeaderComponent ? this.props.renderModalHeaderComponent() : this.renderModalHeaderComponent();
        const renderModalFooterComponent = this.props.renderModalFooterComponent ? this.props.renderModalFooterComponent() : this.renderModalFooterComponent();

        return (
            <Modal
                ref={ref => this.modal = ref}
            >
                {renderModalHeaderComponent}
                <ScrollView
                    ref={ref => this.scrollview = ref}
                    style={containerStyle}
                    keyboardShouldPersistTaps={"handled"}
                >
                    <TextInput
                        ref={ref => this.textinput = ref}
                        multiline={true}
                        autoFocus={true}
                        autoGrow={true}
                        underlineColorAndroid={"transparent"}
                        onContentSizeChange={({ nativeEvent: { contentSize: { width, height } } }) => {
                            this.scrollview && this.scrollview.scrollToEnd({ animated: true });
                        }}
                        onFocus={() => {
                            this.scrollview && this.scrollview.scrollToEnd({ animated: true });
                        }}
                        value={this.state.value}
                        onChangeText={(text) => {
                            if (onChangeText) onChangeText(text)
                            else this.setState({ value: text })
                        }}
                        {...others}
                        style={[styles.textinput, style]}
                    />
                </ScrollView>
                {renderModalFooterComponent}
            </Modal>
        )
    }

    renderModalHeaderComponent() {
        return (
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 40,
            }}>
                <Icon
                    onPress={() => {
                        this.close();
                    }}
                    name="ios-close"
                    style={{
                        width: 48,
                        height: 48,
                        color: theme.TEXT_COLOR,
                        fontSize: 48,
                    }}
                />
                <Icon
                    onPress={() => {
                        this.validate();
                    }}
                    name="ios-save"
                    style={{
                        width: 48,
                        height: 48,
                        color: theme.TEXT_COLOR,
                        fontSize: 28,
                    }}
                />
            </View>
        );
    }

    renderModalFooterComponent() {
        const { height } = Dimensions.get("window");

        return (
            <Button
                onPress={() => {
                    this.validate();
                }}
                style={{
                    position: 'absolute',
                    top: height - 94,
                    right: 16,
                    left: 16,
                }}
            >
                <Text style={{
                    color: "#FFF"
                }}>Enregistrer</Text>
            </Button>
        );
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
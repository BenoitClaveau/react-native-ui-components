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
import Theme, { createStyleSheet } from "./Theme";
import Icon from './Icon';

class TextEditor extends PureComponent {

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            value: nextProps.value
        };
    }

    state = {
    }


    validate() {
        const {
            onValidate,
            onRequestClose,
            value,
        } = this.props;

        if (onValidate) {
            const svalue = this.state.value;
            this.setState({ value: value });
            onValidate(svalue, svalue !== value);
        }

        onRequestClose();
    }

    cancel() {
        const {
            onRequestClose,
        } = this.props;

        onRequestClose();
    }

    render() {
        const {
            style,
            containerStyle,
            value, //exclude from props
            onValidate, //exclude from props
            onChangeText,
            modalVisible,
            onRequestClose,
            ...others
        } = this.props;

        const renderModalHeaderComponent = this.props.renderModalHeaderComponent ? this.props.renderModalHeaderComponent() : this.renderModalHeaderComponent();
        const renderModalFooterComponent = this.props.renderModalFooterComponent ? this.props.renderModalFooterComponent() : this.renderModalFooterComponent();

        return (
            <Modal
                modalVisible={modalVisible}
                onRequestClose={onRequestClose}
                onComponentDidUpdate={() => {
                    if (modalVisible) {
                        this.textinput.blur(); //force to reset
                        setTimeout(() => {
                            this.textinput.focus();
                        }, 250)
                    }
                }}
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
                        autoGrow={true}
                        autoFocus={false}
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
                        this.cancel();
                    }}
                    name="ios-close"
                    style={{
                        width: 48,
                        height: 48,
                        color: Theme.TEXT_COLOR,
                        fontSize: 48,
                    }}
                />
                <Icon
                    onPress={() => {
                        this.validate();
                    }}
                    name="ios-checkmark"
                    style={{
                        width: 48,
                        height: 48,
                        color: Theme.PRIMARY_COLOR,
                        fontSize: 48,
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

let styles = createStyleSheet(()=> {
    styles = StyleSheet.create({
        textinput: {
            backgroundColor: "#FFF",
            paddingHorizontal: 16,
            fontSize: Theme.INPUT_FONT_SIZE,
            fontWeight: "600",
            textAlignVertical: "top",
            color: Theme.TEXT_COLOR,
        }
    });
    console.log("[react-native-ui-components] TextEditor createStyleSheet", styles);
});

export default TextEditor;
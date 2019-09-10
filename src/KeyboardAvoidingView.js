import React, { PureComponent } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

class MyKeyboardAvoidingView extends PureComponent {

    state = {
    };

    render() {
        const {
            children,
            ...others
        } = this.props;

        return (
            <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? "padding" : null}
                    {...others}
                >
                { children }
            </KeyboardAvoidingView>
        );
    }
};

export default MyKeyboardAvoidingView;
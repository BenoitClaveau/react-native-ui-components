import React, { PureComponent } from 'react';
import { Keyboard } from 'react-native';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import Theme, { createStyleSheet } from "./Theme";

class MySafeAreaView extends PureComponent {

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            this.props.onKeyboardDidShow && this.props.onKeyboardDidShow();
        });
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            this.props.onKeyboardDidHide && this.props.onKeyboardDidHide();
        });
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {
        const {
            children,
            style,
            ...others
        } = this.props;

        return (
            <SafeAreaView
                style={[styles.container, style]}
                {...others}
            >
                <StatusBar />
                {children}
            </SafeAreaView>
        )
    }
};

let styles = createStyleSheet(()=> {
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Theme.BACKGROUND_COLOR,
        }
    });
    console.log("[react-native-ui-components] SafeAreaView createStyleSheet", styles);
});

export default MySafeAreaView;
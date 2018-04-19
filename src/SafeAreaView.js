import React, { PureComponent } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import theme from "./Theme";

class MySafeAreaView extends PureComponent {

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
let styles = {};
export function createStyleSheet() {
    console.log("SAFE", theme)
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.BACKGROUND_COLOR,
        }
    });
}

export default MySafeAreaView;
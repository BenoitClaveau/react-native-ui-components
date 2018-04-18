import React, { PureComponent } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import theme from 'react-native-ui-theme';

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
let style;
export function createStyleSheet() {
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: BACKGROUND_COLOR,
        }
    });
}

export default MySafeAreaView;
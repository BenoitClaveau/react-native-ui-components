import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

class Column extends PureComponent {

    render() {
        const {
            children,
            style,
            ...others
        } = this.props;

        return (
            <View
                style={[styles.column, style]}
                {...others}
            >
                {children}
            </View>
        )
    }
};

let styles = {};
export function createStyleSheet() {
    styles = StyleSheet.create({
        column: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
        }
    });
};

export default Column;
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

class Row extends PureComponent {

    render() {
        const {
            children,
            style,
            ...others
        } = this.props;

        return (
            <View
                style={[styles.row, style]}
                {...others}
            >
                {children}
            </View>
        )
    }
};
let style;
export function createStyleSheet() {
    styles = StyleSheet.create({
        row: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        }
    });
}

export default Row;
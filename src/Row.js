import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';

class Row extends PureComponent {

    render() {
        const {
            onPress,
            children,
            style,
            ...others
        } = this.props;

        if (onPress) {
            return (
                <TouchableOpacity
                    onPress={onPress}
                >
                    <View
                        style={[styles.row, style]}
                        {...others}
                    >
                        {children}
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <View
                    style={[styles.row, style]}
                    {...others}
                >
                    {children}
                </View>
            );
        }
    }
};
let styles = {};
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
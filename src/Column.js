import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';

class Column extends PureComponent {

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
                        style={[styles.column, style]}
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
                    style={[styles.column, style]}
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
        column: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
        }
    });
};

export default Column;
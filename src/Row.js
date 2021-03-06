import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { createStyleSheet } from "./Theme";

class Row extends PureComponent {

    render() {
        const {
            onPress,
            children,
            style,
            containerStyle,
            ...others
        } = this.props;

        const view = (
            <View
                style={[styles.row, style]}
                {...others}
            >
                {children}
            </View>
        );

        if (onPress) {
            return (
                <TouchableOpacity
                    style={containerStyle}
                    onPress={onPress}
                >
                    { view }
                </TouchableOpacity>
            );
        }
        return view;
    }
};

let styles;
createStyleSheet(()=> {
    styles = StyleSheet.create({
        row: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        }
    });
    // console.log("[react-native-ui-components] Row createStyleSheet", styles);
});

export default Row;
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { createStyleSheet } from "./Theme";

class Column extends PureComponent {

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
                style={[styles.column, style]}
                {...others}
            >
                {children}
            </View>
        )

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
        column: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
        }
    });
    // console.log("[react-native-ui-components] Column createStyleSheet", styles);
});

export default Column;
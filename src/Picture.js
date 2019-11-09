import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { createStyleSheet } from "./Theme";

class Picture extends PureComponent {

    render() {
        const {
            containerStyle,
            onPress,
            children,
            ...others
        } = this.props;


        if (onPress) {
            return (
                <TouchableOpacity
                    style={[styles.container, containerStyle]}
                    onPress={onPress}
                >
                    <Image
                        {...others}
                    />
                    {children}
                </TouchableOpacity>
            )
        }
        else {
            return (
                <View
                    style={[styles.container, containerStyle]}
                >
                    <Image
                        {...others}
                    />
                    {children}
                </View>
            )
        }
    }
};

let styles = createStyleSheet(()=> {
    styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }
    });
    console.log("[react-native-ui-components] Picture createStyleSheet", styles);
});

export default Picture;
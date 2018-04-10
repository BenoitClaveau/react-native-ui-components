import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import {
    TITLE_FONT_SIZE,
    PRIMARY_COLOR
} from './theme';

class Title extends PureComponent {

    render() {
        const { name, onPress, style, children } = this.props;
        if (onPress) {
            return (
                <TouchableOpacity style={[styles.container, style]}>
                    <Text style={styles.text}>{children}</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <View style={[styles.container, style]}>
                    <Text style={styles.text}>{children}</Text>
                </View>
            )
        }
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: TITLE_FONT_SIZE,
        color: PRIMARY_COLOR,
        fontWeight: "600"
    },
});


export default Title;
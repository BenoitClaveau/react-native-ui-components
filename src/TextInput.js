import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import theme from 'react-native-ui-theme';

class MyTextInput extends PureComponent {

    static getDerivedStateFromProps(props, state) {
        return {
            maxHeight: props.maxHeight || 48,
        }
    }

    state = {
        height: 22
    }

    render() {
        const { maxHeight, height } = this.state;
        const { style, ...others } = this.props;

        return (
            <TextInput
                underlineColorAndroid={"transparent"}
                onContentSizeChange={(event) => {
                    this.setState({ height: event.nativeEvent.contentSize.height })
                }}
                {...others}
                style={[styles.input, style, { height: Math.max(maxHeight, height) }]}
            />
        );
    }
};

let style;
export function createStyleSheet() {
    styles = StyleSheet.create({
        input: {
            flexDirection: "row", 
            backgroundColor: INPUT_BACKGROUND_COLOR,
            paddingHorizontal: 16,
            borderRadius: 12,
            fontSize: INPUT_FONT_SIZE,
            color: PRIMARY_COLOR,
            fontWeight: "600",
        },
    });
};

export default MyTextInput;
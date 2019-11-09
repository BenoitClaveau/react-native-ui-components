import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import Text from "./Text";
import Theme from "./Theme";

class Title extends PureComponent {

    render() {
        const {
            children,
            style,
            ...others
        } = this.props;

        return (
            <Text
                {...others}
                style={[styles.text, style]}
            >{children}</Text>);
    }
};

let styles = Theme.register(()=> {
    styles = StyleSheet.create({
        text: {
            fontSize: Theme.TITLE_FONT_SIZE,
            color: Theme.PRIMARY_COLOR,
            fontWeight: "600"
        },
    });
    console.log("[react-native-ui-components] Title createStyleSheet", styles);
});


export default Title;
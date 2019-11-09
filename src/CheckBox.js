import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from "./Icon";
import Theme from "./Theme";

class CheckBox extends PureComponent {

    render() {
        const {
            style,
            checked,
            onPress
        } = this.props;

        const fontSize = style && style.fontSize ? style.fontSize : 24;

        return (
            <TouchableOpacity
                onPress={onPress}
            >
                <View style={[styles.container, {
                    width: fontSize,
                    height: fontSize,
                    borderRadius: Math.ceil(fontSize / 2),
                    borderColor: checked ? Theme.PRIMARY_COLOR : Theme.INACTIVE_PRIMARY_COLOR,
                    backgroundColor: checked ? Theme.PRIMARY_COLOR : Theme.BACKGROUND_COLOR,
                }]}>
                    {checked ? (
                        <Icon
                            name="ios-checkmark"
                            style={[styles.icon, {
                                fontSize,
                                color: Theme.BACKGROUND_COLOR,
                                backgroundColor: "transparent"
                            }]}
                        />
                    ) : null
                    }
                </View>
            </TouchableOpacity>
        );
    }
};

let styles = Theme.register(()=> {
    styles = StyleSheet.create({
        container: {
            borderWidth: 1.5,
            alignItems: "center",
            justifyContent: "center",
        },
        icon: {
            textAlign: "center"
        }
    });
    console.log("[react-native-ui-components] CheckBox createStyleSheet", styles);
});


export default CheckBox;
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from "./Icon";
import theme from "./Theme";

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
                    borderColor: checked ? theme.PRIMARY_COLOR : theme.INACTIVE_PRIMARY_COLOR,
                    backgroundColor: checked ? theme.PRIMARY_COLOR : theme.BACKGROUND_COLOR,
                }]}>
                    {checked ? (
                        <Icon
                            name="ios-checkmark"
                            style={[styles.icon, {
                                fontSize,
                                color: theme.BACKGROUND_COLOR,
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

let styles = {};
export function createStyleSheet() {
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
};


export default CheckBox;
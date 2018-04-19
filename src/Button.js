import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import Icon from './Icon';
import theme from "./Theme";

class Button extends PureComponent {

    render() {
        const {
            title,
            subTitle,
            onPress,
            disabled,
            iconLeft,
            iconRight,
            style,
            iconLeftStyle,
            iconRightStyle,
            textStyle,
            subTextStyle
        } = this.props;


        let textContainerStyle = styles.textContainer;
        if (iconLeft && !iconRight) textContainerStyle = styles.textContainerLeft;
        if (!iconLeft && iconRight) textContainerStyle = styles.textContainerRight;

        return (
            <TouchableOpacity
                style={[styles.container, style, { opacity: disabled ? 0.4 : 1 }]}
                onPress={() => !disabled && onPress()}
            >
                {iconLeft &&
                    <Icon
                        name={iconLeft}
                        style={[styles.iconLeft, iconLeftStyle]}
                    />
                }
                {title && !subTitle &&
                    <Text
                        style={[styles.text, textStyle]}
                    >
                        {title.toUpperCase()}
                    </Text>
                }
                {title && subTitle &&
                    <View style={textContainerStyle}>
                        <Text
                            style={[styles.text, textStyle]}
                        >
                            {title.toUpperCase()}
                        </Text>
                        <Text
                            style={[styles.subText, subTextStyle]}
                        >
                            {subTitle}
                        </Text>
                    </View>
                }
                {iconRight &&
                    <Icon
                        name={iconRight}
                        style={[styles.iconRight, iconRightStyle]}
                    />
                }
            </TouchableOpacity>
        )
    }
};

let styles = {};
export function createStyleSheet() {
    styles = StyleSheet.create({
        container: {
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.PRIMARY_COLOR
        },
        textContainer: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
        textContainerRight: {
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-around"
        },
        textContainerLeft: {
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-around"
        },
        text: {
            fontSize: theme.INPUT_FONT_SIZE,
            color: theme.BACKGROUND_COLOR,
            fontWeight: "600"
        },
        subText: {
            fontSize: theme.INPUT_FONT_SIZE - 4,
            color: theme.BACKGROUND_COLOR,
            fontWeight: "600"
        },
        iconLeft: {
            marginRight: 8,
            fontSize: theme.ICON_FONT_SIZE,
            color: theme.BACKGROUND_COLOR,
        },
        iconRight: {
            marginLeft: 8,
            fontSize: theme.ICON_FONT_SIZE,
            color: theme.BACKGROUND_COLOR,
        }
    });
};

export default Button;
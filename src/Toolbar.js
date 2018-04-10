import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text
} from 'react-native';
import Button from './Button';
import Icon from './Icon';
import TextInput from './TextInput';
import {
    TOOLBAR_BACKGROUND_COLOR,
    TITLE_FONT_SIZE,
    PRIMARY_COLOR
} from './theme';

class Toolbar extends PureComponent {

    render() {

        const {
            goBack,
            clear,
            title,
            renderPlaceholder,
            onChange,
            ...others
        } = this.props;

        return (
            <View style={styles.container}>
                <Icon
                    onPress={goBack}
                    name="md-arrow-back"
                    style={styles.back}
                />
                {title &&
                    <Text style={styles.title}>{title}</Text>
                }
                {onChange &&
                    <TextInput
                        blurOnSubmit={true}
                        {...others}
                        style={styles.input}
                    />
                }
                {!title && !onChange &&
                    <View style={{ flex: 1 }}></View>
                }
                {clear &&
                    <Icon
                        onPress={clear}
                        name="md-close"
                    />
                }
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "red",
        ...Platform.select({
            ios: {
                height: 44,
                paddingTop: 20,
            },
            android: {
                height: 56,
                paddingTop: 0,
            }
        }),
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        elevation: 4,
    },
    title: {
        flexDirection: "row",
        alignItems: 'center',
        fontSize: TITLE_FONT_SIZE,
        color: PRIMARY_COLOR,
        fontWeight: "600",
        ...Platform.select({
            ios: {
                paddingHorizontal: 70,
                justifyContent: "center"
            },
            android: {
                paddingHorizontal: 56,
                justifyContent: "flex-start"
            }
        })
    },
    back: {
        height: 24,
        width: 24,
        margin: 16,
        fontSize: 24,
    },
    input: {
        flex: 1,
        marginRight: 16,
        marginTop: 6,
        marginBottom: 6,
    }
});

export default Toolbar;
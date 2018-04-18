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
import theme from 'react-native-ui-theme';

class Toolbar extends PureComponent {

    render() {

        const renderLeftComponent = this.props.renderLeftComponent ? this.props.renderLeftComponent() : this.renderLeftComponent();
        const renderCenterComponent = this.props.renderCenterComponent ? this.props.renderCenterComponent() : this.renderCenterComponent();
        const renderRightComponent = this.props.renderRightComponent ? this.props.renderRightComponent() : this.renderRightComponent();

        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    { renderLeftComponent}
                </View>
                <View style={styles.center}>
                    { renderCenterComponent}
                </View>
                <View style={styles.right}>
                    { renderRightComponent}
                </View>
            </View>
        )
    }

    renderLeftComponent() {
        const {
            goBack,
        } = this.props;

        return (
            <Icon
                onPress={goBack}
                name="md-arrow-back"
                style={styles.back}
            />
        );
    }

    renderCenterComponent() {
        const {
            title,
        } = this.props;

        return (
            <Text style={styles.title}>{title}</Text>
        );
    }

    renderRightComponent() {
        const {
            clear,
        } = this.props;

        return (
            <Icon
                onPress={clear}
                name="md-close"
            />
        );
    }
};

let style;
export function createStyleSheet() {
    styles = StyleSheet.create({
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
        left: {
            flexDirection: "row",
            alignItems: 'center',
            ...Platform.select({
                ios: {
                    width: 70,
                },
                android: {
                    width: 56,
                }
            })
        },
        center: {
            flexDirection: "row",
            alignItems: 'center',
            ...Platform.select({
                ios: {
                    justifyContent: "center"
                },
                android: {
                    justifyContent: "flex-start"
                }
            })
        },
        right: {
            flexDirection: "row",
            alignItems: 'center',
            ...Platform.select({
                ios: {
                    width: 70,
                },
                android: {
                    width: 56,
                }
            })
        },
        title: {
            fontSize: TITLE_FONT_SIZE,
            color: PRIMARY_COLOR,
            fontWeight: "600",
        },
    });
};

export default Toolbar;
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
import Theme from "./Theme";

class Toolbar extends PureComponent {

    render() {

        const renderLeftComponent = this.props.renderLeftComponent ? this.props.renderLeftComponent() : this.renderLeftComponent();
        const renderCenterComponent = this.props.renderCenterComponent ? this.props.renderCenterComponent() : this.renderCenterComponent();
        const renderRightComponent = this.props.renderRightComponent ? this.props.renderRightComponent() : this.renderRightComponent();

        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    { renderLeftComponent }
                </View>
                <View style={styles.center}>
                    { renderCenterComponent }
                </View>
                <View style={styles.right}>
                    { renderRightComponent }
                </View>
            </View>
        )
    }

    renderLeftComponent() {
        if (this.props.goBack) return this.renderGoBackComponent();
        return null;
    }

    renderCenterComponent() {
        if (this.props.title) return this.renderTitleComponent();
        return null;
    }

    renderRightComponent() {
        if (this.props.close) return this.renderCloseComponent();
        return null;
    }

    renderTitleComponent() {
        const {
            title,
        } = this.props;

        return (
            <Text style={styles.title}>{title}</Text>
        );
    }

    renderGoBackComponent() {
        const {
            goBack,
        } = this.props;

        return (
            <Icon
                style={styles.icon}
                onPress={goBack}
                name="md-arrow-back"
            />
        );
    }

    renderCloseComponent() {
        const {
            close,
        } = this.props;

        return (
            <Icon
                style={styles.icon}
                onPress={close}
                name="md-close"
            />
        );
    }
};

let styles = Theme.register(()=> {
    styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            //backgroundColor: "red",
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
            justifyContent: 'center',
            //backgroundColor: "blue",
            ...Platform.select({
                ios: {
                    width: 70,
                    height: 44,
                },
                android: {
                    width: 70,
                    height: 56,
                }
            })
        },
        center: {
            flexDirection: "row",
            alignItems: 'center',
            //backgroundColor: "black",
            flexGrow: 1,
            flexShrink: 1,
            ...Platform.select({
                ios: {
                    justifyContent: "center",
                    height: 44,
                },
                android: {
                    justifyContent: "flex-start",
                    height: 56,
                }
            })
        },
        right: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: "yellow",
            ...Platform.select({
                ios: {
                    width: 70,
                    height: 44,
                },
                android: {
                    width: 56,
                    height: 56,
                }
            })
        },
        title: {
            fontSize: Theme.TITLE_FONT_SIZE,
            color: Theme.PRIMARY_COLOR,
            fontWeight: "600",
        },
        icon: {
            alignItems: 'center',
            justifyContent: 'center',
            color: Theme.TEXT_COLOR,
            ...Platform.select({
                ios: {
                    width: 44,
                    height: 44,
                },
                android: {
                    width: 56,
                    height: 56,
                }
            })
        }
    });
    console.log("[react-native-ui-components] Toolbar createStyleSheet", styles);
});

export default Toolbar;
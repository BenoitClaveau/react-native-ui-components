import React, { PureComponent } from 'react';
import {
    View,
    Animated,
    PanResponder,
} from 'react-native';

class VerticalExpandeable extends PureComponent {

    state = {
        opened: false
    };

    translateY = new Animated.Value(0);

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return Math.abs(gestureState.dx) >= 5 || Math.abs(gestureState.dy) >= 5;
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
            return Math.abs(gestureState.dx) >= 5 || Math.abs(gestureState.dy) >= 5;
        },
        onPanResponderGrant: (evt, gestureState) => true,
        onPanResponderMove: Animated.event([null, { dy: this.translateY }]),
        onPanResponderRelease: (e, gestureState) => {
            if (Math.abs(gestureState.dy) < 5) {    //on reviens à la position initiale
                this.state.opened ? this.open() : this.close();
            }
            else {
                gestureState.vy >= 0 ? this.open() : this.close();
            }
        }
    });

    constructor(props) {
        super(props);
        this.translateY.addListener((...args) => {
            this.props.onTranslateY && this.props.onTranslateY(...args);
        });
    }

    isOpen() {
        return this.state.opened;
    }

    async close() {
        return await new Promise((resolve, reject) => {
            this.setState({ opened: false }, () => {
                Animated.timing(this.translateY, {
                    toValue: 0,
                    duration: 500
                }).start(() => {
                    this.translateY.setOffset(0);
                    resolve();
                });
            });
        });
    }

    async open() {
        const {
            openedHeight,
        } = this.props;

        return await new Promise((resolve, reject) => {
            this.setState({ opened: true }, () => {
                Animated.timing(this.translateY, {
                    toValue: openedHeight,
                    duration: 500
                }).start(() => {
                    this.translateY.setOffset(openedHeight);
                    resolve();
                });
            });
        });
    }

    render() {
        const {
            children,
            closedHeight,
            openedHeight,
            style,
        } = this.props;

        return (
            <Animated.View
                style={[{
                    backgroundColor: "transparent", //Si je supprime la background panResponder n'attrape plus les évenements !
                    height: this.translateY.interpolate({
                        inputRange: [0, openedHeight],
                        outputRange: [closedHeight, openedHeight],
                        extrapolate: 'clamp',
                    }),
                }, style]}
                {...this.panResponder.panHandlers}
            >
                {children}
            </Animated.View>
        )
    }
};

export default VerticalExpandeable;
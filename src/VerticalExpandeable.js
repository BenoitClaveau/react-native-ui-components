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
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => true,
        onPanResponderMove: Animated.event([null, { dy: this.translateY }]),
        onPanResponderRelease: (e, gestureState) => {
            const {
                closedHeight,
                openedHeight,
            } = this.props;

            if (Math.abs(gestureState.dy) < 2) {    //on reviens à la position initiale
                Animated.timing(this.translateY, {
                    toValue: this.state.opened ? openedHeight : 0,    //on determine si c'est ouvert ou fermé
                    duration: 500
                }).start();
                this.translateY.setOffset(this.state.opened ? openedHeight : 0);
            }
            else {
                this.setState({ opened: gestureState.vy >= 0 }, () => {
                    Animated.timing(this.translateY, {  //on ouvre ou on ferme
                        toValue: this.state.opened ? openedHeight : 0,
                        duration: 500
                    }).start();
                    this.translateY.setOffset(this.state.opened ? openedHeight : 0);
                });
            }
        }
    });

    constructor(props) {
        super(props);
        this.translateY.addListener((...args) => {
            this.props.onTranslateY && this.props.onTranslateY(...args);
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
                style={[
                    style, {
                        height: this.translateY.interpolate({
                            inputRange: [0, openedHeight],
                            outputRange: [closedHeight, openedHeight],
                            extrapolate: 'clamp',
                        }),
                    }]}
                {...this.panResponder.panHandlers}
            >
                {children}
            </Animated.View>
        )
    }
};

export default VerticalExpandeable;
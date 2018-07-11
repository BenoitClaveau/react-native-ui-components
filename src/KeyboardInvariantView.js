import React, { PureComponent } from 'react';
import {
    View,
    Dimensions,
} from 'react-native';

class KeyboardInvariantView extends PureComponent {

    state = {
        height: null,
    };

    resize = () => {
        this.setState({
            height: null
        });
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.resize);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.resize);
    }

    render() {

        const {
            children,
            style,
            initialHeight,
            height,
            style,
        } = this.props;

        const {
            height: stateHeight,
        } = this.state;

        const { height: windowHeight } = Dimensions.get("window");

        const localHeight = height ? height : stateHeight ? stateHeight : initialHeight;
        console.log("*************** TOP", windowHeight - localHeight)
        return (
            <View
                onLayout={({ nativeEvent: { layout } }) => {
                    this.setState({
                        height: layout.height
                    })
                }}
                style={[style, {
                    position: "absolute",
                    top: windowHeight - localHeight
                }]}
            >
                {children}
            </View>
        )
    }
};

export default KeyboardInvariantView;
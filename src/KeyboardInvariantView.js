import React, { PureComponent } from 'react';
import {
    View,
    Dimensions,
} from 'react-native';

class KeyboardInvariantView extends PureComponent {

    state = {
        height: null,
    };

    changeDimensions = () => {
        this.setState({
            height: null
        });
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.changeDimensions);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.changeDimensions);
    }

    render() {

        const {
            children,
            style,
        } = this.props;

        const {
            height,
        } = this.state;

        const localStyle = height ? { height : height } : { flex : 1 }

        return (
            <View
                onLayout={({ nativeEvent: { layout } }) => {
                    this.setState({
                        height: layout.height
                    })
                }}
                style={[{
                    backgroundColor: "transparent",
                }, localStyle]}
            >
                <View style={[{
                    flex: 1,
                    justifyContent: "flex-end",
                }, style]}>
                    {children}
                </View>
            </View>
        )
    }
};

export default KeyboardInvariantView;
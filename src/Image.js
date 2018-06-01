import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

class MyImage extends PureComponent {

    render() {
        const {
            onPress,
            ...others
        } = this.props;


        if (onPress) {
            return (
                <TouchableOpacity
                    onPress={onPress}
                >
                    <Image
                        {...others}
                    />
                </TouchableOpacity>
            )
        }
        else {
            return (
                <Image
                    {...others}
                />
            )
        }
    }
};

export default MyImage;
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

class Group extends PureComponent {

    render() {
        let { children, containerStyle } = this.props;
        if (!Array.isArray(children)) children = [children];
        const last = Math.max(children.length, 0) - 1;
        return (
            <View style={[group.container, containerStyle]}>
                {children.map((child, index) => {
                    <View
                        key={index}
                        style={[style, { paddingBottom: index == last ? 0 : 16 }]}
                    >
                        {child}
                    </View>
                })}
            </View>
        )
    }
};

let styles = {};
    export function createStyleSheet() {
        styles = StyleSheet.create({
        container: {
            padding: 16,
        }
    });
};

export default Group;
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Foundation from 'react-native-vector-icons/Foundation';

class MyIcon extends PureComponent {

    getIconComponent() {
        const {
            lib,
        } = this.props;
        
        switch(lib) {
            case undefined: return Ionicons;
            case "feather": return Feather;
            case "entypo": return Entypo;
            case "evilicons": return EvilIcons;
            case "fontawesome": return FontAwesome;
            case "fontawesome5": return FontAwesome5;
            case "fontawesome5pro": return FontAwesome5Pro;
            case "foundation": return Foundation;
            default : return Ionicons;
        }
    }

    render() {
        const { name, onPress, style } = this.props;

        const {
            fontSize,
            color,
            ...others
        } = StyleSheet.flatten(style) || {};

        const Icon = this.getIconComponent();

        if (onPress) {
            return (
                <TouchableOpacity
                    onPress={onPress}
                    style={[styles.container, others]}
                >
                    <Icon
                        size={fontSize || 24}
                        color={color || "#F00"}
                        name={name}
                    />
                </TouchableOpacity>
            )
        }
        else {
            return (
                <View style={[styles.container, others]}>
                    <Icon
                        size={fontSize || 24}
                        color={color || "#F00"}
                        name={name}
                    />
                </View>
            )
        }
    }
};

let styles = {};
export function createStyleSheet() {
    styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent"
        }
    });
    console.log("[react-native-ui-components] Icon createStyleS
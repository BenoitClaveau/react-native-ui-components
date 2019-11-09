import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { createStyleSheet } from "./Theme";

class Group extends PureComponent {

    render() {
        let { 
            children,
            containerStyle
        } = this.props;
        
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

let styles = createStyleSheet(()=> {
    styles = StyleSheet.create({
        container: {
            padding: 16,
        }
    });
    console.log("[react-native-ui-components] Group createStyleSheet", styles);
});

export default Group;
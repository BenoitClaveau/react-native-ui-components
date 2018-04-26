import React, { PureComponent } from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';

class Select extends PureComponent {

    constructor(props) {
        super(props);
        if (!props.renderItem) throw new Error("renderItem is not defined.");
        if (!props.onSelect) throw new Error("onSelect is not defined.");
    }

    render() {

        const {
            onSelect,
            renderItem,
            ...others
        } = this.props;

        return (
            <FlatList
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                onEndReachedThreshold={1}
                renderItem={(...args) => {
                    return (
                        <TouchableOpacity
                            underlayColor='transparent'
                            onPress={() => onSelect(...args)}
                        >
                            {renderItem(...args)}
                        </TouchableOpacity>
                    )
                }}
                {...others}
            />
        );
    }
}

export default Select;
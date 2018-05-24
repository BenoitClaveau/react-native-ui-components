import React, { PureComponent } from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Timeline from './Timeline';

class Select extends PureComponent {

    constructor(props) {
        super(props);
        if (!props.renderItem) throw new Error("renderItem is not defined.");
        if (!props.onSelect) throw new Error("onSelect is not defined.");
    }

    scrollToIndex(params) {
        this.refs.flatlist.scrollToIndex(params);
    }

    scrollToItem(params) {
        this.refs.flatlist.scrollToItem(params);
    }

    scrollToOffset(params) {
        this.refs.flatlist.scrollToOffset(params);
    }

    flashScrollIndicators() {
        this.refs.flatlist.flashScrollIndicators();
    }

    getScrollMetrics() {
        return this.refs.flatlist.getScrollMetrics();
    }

    render() {

        const {
            onSelect,
            renderItem,
            timeline,
            ...others
        } = this.props;

        if (timeline) {
            return (
                <Timeline
                    ref="flatlist"
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
        else {
            return (
                <FlatList
                    ref="flatlist"
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
}

export default Select;
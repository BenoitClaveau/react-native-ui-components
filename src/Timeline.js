import React, { PureComponent } from 'react';
import {
    StyleSheet,
    VirtualizedList,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import debounce from 'debounce';

class Timeline extends PureComponent {

    static defaultProps = {
        ...VirtualizedList.defaultProps,
        numColumns: 1,
        debounceInterval: 350,
    };

    constructor(props) {
        super(props);
        if (this.props.viewabilityConfigCallbackPairs) {
            this._virtualizedListPairs = this.props.viewabilityConfigCallbackPairs.map(
                pair => ({
                    viewabilityConfig: pair.viewabilityConfig,
                    onViewableItemsChanged: this._createOnViewableItemsChanged(
                        pair.onViewableItemsChanged,
                    ),
                }),
            );
        } else if (this.props.onViewableItemsChanged) {
            /* $FlowFixMe(>=0.63.0 site=react_native_fb) This comment suppresses an
             * error found when Flow v0.63 was deployed. To see the error delete this
             * comment and run Flow. */
            this._virtualizedListPairs.push({
                viewabilityConfig: this.props.viewabilityConfig,
                onViewableItemsChanged: this._createOnViewableItemsChanged(
                    this.props.onViewableItemsChanged,
                ),
            });
        }
    }

    _onStartReached = false;
    _onEndReached = false;

    scrollToOffset(params) {
        this.refs.flatlist.scrollToOffset(params);
    }

    _pushMultiColumnViewable(arr, v) {
        const { numColumns, keyExtractor } = this.props;
        v.item.forEach((item, ii) => {
            invariant(v.index != null, 'Missing index!');
            const index = v.index * numColumns + ii;
            arr.push({ ...v, item, key: keyExtractor(item, index), index });
        });
    }

    _createOnViewableItemsChanged = (onViewableItemsChanged) => {
        const { numColumns } = this.props;
        if (onViewableItemsChanged) {
            if (numColumns > 1) {
                const changed = [];
                const viewableItems = [];
                info.viewableItems.forEach(v =>
                    this._pushMultiColumnViewable(viewableItems, v),
                );
                info.changed.forEach(v => this._pushMultiColumnViewable(changed, v));
                onViewableItemsChanged({ viewableItems, changed });
            } else {
                onViewableItemsChanged(info);
            }
        }
    };

    _renderItem = (info) => {
        const { renderItem, numColumns, columnWrapperStyle, itemWrapperStyle, horizontal, itemLength } = this.props;
        if (numColumns > 1) {
            const { item, index } = info;
            invariant(
                Array.isArray(item),
                'Expected array of items with numColumns > 1',
            );
            return (
                <View style={[{ flexDirection: 'row' }, columnWrapperStyle]}>
                    {item.map((it, kk) => {
                        const element = renderItem({
                            item: it,
                            index: index * numColumns + kk,
                            separators: info.separators,
                        });
                        return element && React.cloneElement(element, { key: kk });
                    })}
                </View>
            );
        } else {
            const pageStyle = horizontal ? { width: itemLength } : { height: itemLength };
            return (
                <View style={[pageStyle, itemWrapperStyle]}>
                    {renderItem(info)}
                </View>
            );
        }
    };

    _getItem = (data, index) => {
        const { numColumns } = this.props;
        if (numColumns > 1) {
            const ret = [];
            for (let kk = 0; kk < numColumns; kk++) {
                const item = data[index * numColumns + kk];
                item && ret.push(item);
            }
            return ret;
        } else {
            return data[index];
        }
    };

    _getItemCount = (data) => {
        return data ? Math.ceil(data.length / this.props.numColumns) : 0;
    };

    componentDidUpdate() {
        if (this._onStartReached || this._onEndReached) {
            this._onStartReached = false; //scroll needed
            this._onEndReached = false; //scroll needed
            this.refs.flatlist.scrollToOffset({ offset: this.midOffset, animated: false });
        }
        
    }

    onStartReached = debounce(async (...args) => {
        this.props.onStartReached(...args);
    }, this.props.debounceInterval, false);

    onEndReached = debounce(async (...args) => {
        this.props.onEndReached(...args);
    }, this.props.debounceInterval, false);

    get mid() {
        const {
            data,
        } = this.props;

        return Math.floor(data.length / 2);
    }

    get midOffset() {
        const {
            itemLength,
        } = this.props;

        return this.mid * itemLength;
    }

    get windowLength() {
        const {
            horizontal,
        } = this.props;

        const { height, width } = Dimensions.get("window");
        return horizontal ? width : height;
    }

    render() {

        const {
            itemLength,
            renderItem,
            horizontal,
            onEndReached, //remove
            onEndReachedThreshold, //remove
            ...others
        } = this.props;

        const onStartReachedThreshold = (this.windowLength / itemLength) * this.mid;

        return (
            <VirtualizedList
                {...others}
                ref="flatlist"
                horizontal={horizontal}
                initialScrollIndex={this.mid}
                onEndReachedThreshold={onStartReachedThreshold}
                renderItem={this._renderItem}
                getItem={this._getItem}
                getItemCount={this._getItemCount}
                getItemLayout={(data, index) => {
                    return { length: itemLength, offset: itemLength * index, index }
                }}
                viewabilityConfigCallbackPairs={this._virtualizedListPairs}
                onMomentumScrollEnd={({ nativeEvent }) => {
                    const {
                        itemLength
                    } = this.props;

                    const { contentLength, visibleLength, offset, dOffset } = this.refs.flatlist._getScrollMetrics();
                    console.log("onMomentumScrollEnd", dOffset)
                    if (dOffset >= 0) {
                        const distanceFromEnd = contentLength - visibleLength - offset;

                        console.log("distanceFromEnd", distanceFromEnd, "midOffset", this.midOffset, "itemLength", itemLength)
                        if (
                            distanceFromEnd < onEndReachedThreshold * visibleLength
                        ) {
                            this._onEndReached = true;
                            this.onStartReached.clear();
                            this.onEndReached.clear();
                            const splicedItems = (this.midOffset - distanceFromEnd) / itemLength;
                            this.onEndReached({ distanceFromEnd, splicedItems });
                        }
                    }
                    else {
                        const distanceFromStart = offset;
                        console.log("distanceFromStart", distanceFromStart, "midOffset", this.midOffset, "itemLength", itemLength)
                        if (
                            distanceFromStart < onStartReachedThreshold * visibleLength
                        ) {
                            this._onStartReached = true;
                            this.onStartReached.clear();
                            this.onEndReached.clear();
                            const splicedItems = (this.midOffset - distanceFromStart) / itemLength;
                            this.onStartReached({ distanceFromStart, splicedItems });
                        }
                    }
                }}
            />
        );
    }
}

export default Timeline;
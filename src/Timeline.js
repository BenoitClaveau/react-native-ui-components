import React, { Component } from 'react';
import {
    StyleSheet,
    VirtualizedList,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import debounce from 'debounce';

class Timeline extends Component {

    static defaultProps = {
        ...VirtualizedList.defaultProps,
        numColumns: 1,
        debounceInterval: 500,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            data: nextProps.data
        };
    }

    state = {};

    constructor(props, state, snapshot) {
        super(props, state, snapshot);
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

    scrollToIndex(params) {
        this.refs.flatlist.scrollToIndex(params);
    }

    scrollToItem(params) {
        this.refs.flatlist.scrollToItem(params);
    }

    scrollToEnd(params) {
        this.refs.flatlist.scrollToEnd(params);
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

    shouldComponentUpdate(nextProps, nextState) {
        if (this._onStartReached || this._onEndReached) {
            this.refs.flatlist.state.first = this.mid; //reset first withour rendering
            const offset = nextProps.scrollOffset ? this.midOffset - nextProps.scrollOffset : this.midOffset; //scroll before rendering to limit flickering
            this.refs.flatlist.scrollToOffset({ offset, animated: false });
            return true;
        }
        else return false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this._onStartReached || this._onEndReached) { //reset flags
            this._onStartReached = false; //scroll needed
            this._onEndReached = false; //scroll needed
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
        } = this.state;

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
            data,
            onReachedThreshold,
            ...others
        } = this.props;
        

        const onReachedThresholdValue = onReachedThreshold || (this.windowLength / itemLength) * this.mid;

        return (
            <VirtualizedList
                data={this.state.data}
                {...others}
                ref="flatlist"
                scrollEnabled={this.state.scrollEnabled}
                horizontal={horizontal}
                initialScrollIndex={this.mid}
                renderItem={this._renderItem}
                getItem={this._getItem}
                getItemCount={this._getItemCount}
                getItemLayout={(data, index) => {
                    return { length: itemLength, offset: itemLength * index, index }
                }}
                viewabilityConfigCallbackPairs={this._virtualizedListPairs}
                onMomentumScrollBegin={({ nativeEvent }) => {
                    this.onStartReached.clear();
                    this.onEndReached.clear();
                    this.scrollPosition = horizontal ? nativeEvent.contentOffset.x : nativeEvent.contentOffset.y;
                }}
                onMomentumScrollEnd={({ nativeEvent }) => {
                    const {
                        itemLength
                    } = this.props;

                    const scrollPosition = horizontal ? nativeEvent.contentOffset.x : nativeEvent.contentOffset.y;
                    const way = scrollPosition - this.scrollPosition;

                    //console.log("WAY", way >= 0 ? "to end" : "to start", "value", way)
                    const { contentLength, visibleLength, offset, dOffset } = this.refs.flatlist._getScrollMetrics();
                    const distanceFromEnd = contentLength - visibleLength - offset;
                    const distanceFromStart = offset;
                    //console.log("distanceFromEnd", distanceFromEnd, "distanceFromStart", distanceFromStart, "limit", onReachedThresholdValue * visibleLength, "onReachedThresholdValue", onReachedThresholdValue, "contentLength", contentLength, "visibleLength", visibleLength, "itemLength", itemLength)
                        
                    if (way > 0) {
                        if (
                            distanceFromEnd < onReachedThresholdValue * visibleLength
                        ) {
                            
                            this._onEndReached = true;
                            this.onStartReached.clear();
                            this.onEndReached.clear();
                            const midItemOffset = Math.abs(distanceFromStart - this.midOffset);
                            const slicedItemsWithDecimal = midItemOffset / itemLength;
                            const slicedItems = Math.floor(slicedItemsWithDecimal);
                            const scrollOffset = -(slicedItemsWithDecimal - slicedItems) * itemLength;
                            //console.log("onEndReached slicedItems", slicedItems)
                            this.onEndReached({ distanceFromEnd, slicedItems, scrollOffset });

                        }
                    }
                    else {
                        if (
                            distanceFromStart < onReachedThreshold * visibleLength
                        ) {
                            this._onStartReached = true;
                            this.onStartReached.clear();
                            this.onEndReached.clear();

                            const midItemOffset = Math.abs(distanceFromStart - this.midOffset)
                            const slicedItemsWithDecimal = midItemOffset / itemLength;
                            const slicedItems = Math.floor(slicedItemsWithDecimal);
                            const scrollOffset = (slicedItemsWithDecimal - slicedItems) * itemLength;
                            //console.log("onStartReached slicedItems", slicedItems)
                            this.onStartReached({ distanceFromStart, slicedItems, scrollOffset });
                        }
                    }
                }}
            />
        );
    }
}

export default Timeline;
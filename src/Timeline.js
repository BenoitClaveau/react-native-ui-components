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
        debounceInterval: 500,
    };

    state = {};
    _virtualizedListPairs = [];

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

    scrollTo(fn, params) {
        const item = this.props.data.filter(fn)[0];
        // console.log("SCROLLTO item", item)
        if (item) this.scrollToItem({ ...params, item });
    }

    _pushMultiColumnViewable(arr, v) {
        const { numColumns, keyExtractor } = this.props;
        v.item.forEach((item, ii) => {
            invariant(v.index != null, 'Missing index!');
            const index = v.index * numColumns + ii;
            arr.push({ ...v, item, key: keyExtractor(item, index), index });
        });
    }

    _createOnViewableItemsChanged(
        onViewableItemsChanged: ?(info: {
            viewableItems: Array<ViewToken>,
            changed: Array<ViewToken>,
        }) => void,
    ) {
        return (info: {
            viewableItems: Array<ViewToken>,
            changed: Array<ViewToken>,
        }) => {
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
    }

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

    get windowLength() {
        const {
            horizontal,
        } = this.props;

        const { height, width } = Dimensions.get("window");
        return horizontal ? width : height;
    }


    getScrollMetrics() {
        return this.refs.flatlist._getScrollMetrics();
    }

    get currentItem() {
        const {
            data,
        } = this.props;

        return data[this.currentIndex];
    }

    get currentIndex() {
        const {
            itemLength,
        } = this.props;

        const { contentLength, visibleLength, offset, dOffset } = this.getScrollMetrics();
        return Math.max(Math.round(offset / itemLength), 0);
    }

    componentDidUpdate() {
        // console.log("DID UPDATE timeline")

        this.props.onDidUpdate && this.props.onDidUpdate();
    }

    render() {

        // console.log("RENDEr timeline")

        const {
            itemLength,
            renderItem,
            onReachedThreshold,
            onEndReached, //remove
            onEndReachedThreshold, //remove
            horizontal,
            ...others
        } = this.props;

        const onReachedThresholdValue = onReachedThreshold || (itemLength / this.windowLength) * this.mid;

        return (
            <VirtualizedList
                {...others}
                ref="flatlist"
                horizontal={horizontal}
                renderItem={this._renderItem}
                getItem={this._getItem}
                getItemCount={this._getItemCount}
                getItemLayout={(data, index) => {
                    return { length: itemLength, offset: itemLength * index, index }
                }}
                viewabilityConfigCallbackPairs={this._virtualizedListPairs}
                onScroll={({ nativeEvent }) => {
                    this.scrollVelocity = horizontal ? nativeEvent.velocity.x : nativeEvent.velocity.y
                }}
                onScrollBeginDrag={({ nativeEvent }) => {
                    this.onStartReached.clear();
                    this.onEndReached.clear();
                }}
                onMomentumScrollEnd={({ nativeEvent }) => {
                    const {
                        itemLength
                    } = this.props;

                    this.onStartReached.clear();
                    this.onEndReached.clear();

                    const { contentLength, visibleLength, offset, dOffset } = this.getScrollMetrics();
                    const distanceFromEnd = contentLength - visibleLength - offset;
                    const distanceFromStart = offset;
                    
                    if (this.scrollVelocity > 0) {
                        if (
                            distanceFromEnd < onReachedThresholdValue * visibleLength
                        ) {
                            this.onEndReached({ distanceFromEnd });
                        }
                    }
                    if (this.scrollVelocity < 0) {
                        if (
                            distanceFromStart < onReachedThresholdValue * visibleLength
                        ) {
                            this.onStartReached({ distanceFromStart });
                        }
                    }
                }}
            />
        );
    }
}

export default Timeline;
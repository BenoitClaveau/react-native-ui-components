import React, { PureComponent } from 'react';
import { 
    View,
    TouchableOpacity,
} from 'react-native';
import Select from './Select';
import Modal from './Modal';
import theme from "./Theme";
import Icon from './Icon';

class ComboBox extends PureComponent {

    state = {
        modalVisible: false
    }

    onSelect(...args) {
        this.close();
        this.props.onSelect && this.props.onSelect(...args);
    }

    scrollToIndex(params) {
        this.select.scrollToIndex(params);
    }

    scrollToItem(params) {
        this.select.scrollToItem(params);
    }

    scrollToOffset(params) {
        this.select.scrollToOffset(params);
    }

    flashScrollIndicators() {
        this.select.flashScrollIndicators();
    }

    getScrollMetrics() {
        return this.select.getScrollMetrics();
    }

    open() {
        this.setState({ modalVisible: true });
    }

    close() {
        this.setState({ modalVisible: false });
    }

    render() {

        const {
            renderPlaceholder,
            onSelect,
            onRequestClose,
            ...others
        } = this.props;

        if (!renderPlaceholder) throw new Error("renderPlaceholder is not defined.");
        const placeholder = renderPlaceholder();

        const renderModalHeaderComponent = this.props.renderModalHeaderComponent ? this.props.renderModalHeaderComponent() : this.renderModalHeaderComponent();
        const renderModalFooterComponent = this.props.renderModalFooterComponent ? this.props.renderModalFooterComponent() : this.renderModalFooterComponent();

        return (
            <View>
                <Modal
                    modalVisible={modalVisible}
                    onRequestClose={onRequestClose}
                >
                    {renderModalHeaderComponent}
                    <Select
                        ref={ref => this.select = ref}
                        onSelect={(...args) => {
                            this.onSelect(...args);
                        }}
                        {...others}
                    />
                    {renderModalFooterComponent}
                </Modal>
                <TouchableOpacity
                    onPress={() => this.open()}
                >
                    {placeholder}
                </TouchableOpacity>
            </View>
        )
    }

    renderModalHeaderComponent() {
        return (
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 40,
            }}>
                <Icon
                    onPress={() => {
                        this.close();
                    }}
                    name="ios-close"
                    style={{
                        width: 48,
                        height: 48,
                        color: theme.TEXT_COLOR,
                        fontSize: 48,
                    }}
                />
            </View>
        );
    }

    renderModalFooterComponent() {
        return null;
    }
};

export default ComboBox;
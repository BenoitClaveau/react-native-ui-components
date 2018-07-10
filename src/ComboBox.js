import React, { PureComponent } from 'react';
import { 
    View,
    TouchableOpacity,
    Text,
    InteractionManager,
} from 'react-native';
import Select from './Select';
import Modal from './Modal';

class ComboBox extends PureComponent {

    constructor(props) {
        super(props);
        if (!props.onSelect) throw new Error("onSelect is not defined.");
    }

    open() {
        if (!this.modal) return;
        this.modal.open();
    }

    focus() {
        this.open();
    }

    blur() {
    }
    
    onOpen(...args) {
        this.props.onOpen && this.onOpen.onClose(...args);
    }

    async close() {
        return await this.modal.close();
    }

    onClose(...args) {
        this.props.onClose && this.props.onClose(...args);
    }

    async onSelect(...args) {
        await this.close();
        this.props.onSelect(...args);
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

    render() {

        const {
            title,
            renderPlaceholder,
            onSelect,
            renderLeftComponent,
            timeline,
            ...others
        } = this.props;

        if (!renderPlaceholder) throw new Error("renderPlaceholder is not defined.");
        const placeholder = renderPlaceholder();

        return (
            <View>
                <Modal
                    ref={ref => this.modal = ref}
                    title
                    onOpen={(...args) => this.onOpen(...args)}
                    onClose={(...args) => this.onClose(...args)}
                    renderLeftComponent={(...args) => renderLeftComponent && renderLeftComponent(...args)}
                >
                    <Select
                        ref={ref => this.select = ref}
                        onSelect={(...args) => this.onSelect(...args)}
                        timeline={timeline}
                        {...others}
                    />
                </Modal>
                <TouchableOpacity
                    onPress={() => this.open()}
                >
                    {placeholder}
                </TouchableOpacity>
            </View>
        )
    }
};

export default ComboBox;
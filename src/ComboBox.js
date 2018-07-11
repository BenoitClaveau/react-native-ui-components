import React, { PureComponent } from 'react';
import { 
    View,
    TouchableOpacity,
    Text,
    InteractionManager,
} from 'react-native';
import Select from './Select';
import Modal from './Modal';
import Toolbar from './Toolbar';

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
    
    async close() {
        if (!this.modal) return;
        return await this.modal.close();
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
            onOpen,
            onClose,
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
                >
                    <Toolbar
                        title
                        renderLeftComponent={renderLeftComponent}                   
                        onOpen={onOpen}
                        onClose={onClose}
                    />
                    <Select
                        ref={ref => this.select = ref}
                        onSelect={this.onSelect}
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
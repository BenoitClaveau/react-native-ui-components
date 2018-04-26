import React, { PureComponent } from 'react';
import { 
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import Select from './Select';
import Modal from './Modal';

class ComboBox extends PureComponent {

    constructor(props) {
        super(props);
        if (!props.onSelect) throw new Error("onSelect is not defined.");
    }

    open() {
        return this.refs.modal.open();
    }

    close() {
        return this.refs.modal.close();
    }

    onSelect(...args) {
        this.props.onSelect(...args);
        this.close();
    }

    render() {
        const {
            title,
            renderPlaceholder,
            onSelect,
            ...others
        } = this.props;

        if (!renderPlaceholder) throw new Error(" renderPlaceholder is not defined.");
        const placeholder = renderPlaceholder();

        return (
            <View>
                <Modal
                    ref={"modal"}
                    title={title}
                >
                    <Select
                        onSelect={(...args) => this.onSelect(...args)}
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
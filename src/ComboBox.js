import React, { PureComponent } from 'react';
import { 
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import Select from './Select';
import Modal from './Modal';

class ComboBox extends PureComponent {

    open() {
        return this.refs.modal.open();
    }

    render() {
        const {
            title,
            renderPlaceholder,
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
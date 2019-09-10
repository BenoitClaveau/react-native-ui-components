import React, { PureComponent } from 'react';
import {
    View,
} from 'react-native';
import Modal from './Modal';
import Select from './Select';
import debounce from 'debounce';

class AutoComplete extends PureComponent {

    state = {
        q: null
    }

    onSearchChange(text) {
        if (!text) text = null;
        this.setState({ q: text }, () => {
            this.debounceFetch();
        })
    }

    debounceFetch = debounce(async () => {
        await this.props.fetch(this.state.q)
    }, 150)

    render() {
        const {
            searchPlacehodler,
            renderPlaceholder,
            modalVisible,
           	onRequestClose,
            ...others
        } = this.props;

        if (!renderPlaceholder) throw new Error("renderPlaceholder is not defined.");

        return (
            <View>
                <Modal
                    modalVisible={modalVisible}
                    onRequestClose={onRequestClose}
                >
                    <Toolbar
                        search={this.state.q}
                        searchPlacehodler={searchPlacehodler}
                        onSearchChange={text => this.onSearchChange(text)}
                        renderPlaceholder={renderPlaceholder}
                    />
                    <Select
                        {...others}
                    />
                </Modal>
            </View>
        )
    }
};

export default AutoComplete;
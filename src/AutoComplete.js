import React, { PureComponent } from 'react';
import {
    View,
} from 'react-native';
import Modal from './Modal';
import Select from './Select';
import debounce from 'debounce';

class AutoComplete extends PureComponent {

    state = {
        modalVisible: 0,
        q: null
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
            ...others
        } = this.props;

        if (!renderPlaceholder) throw new Error("renderPlaceholder is not defined.");

        return (
            <View>
                <Modal
                    ref={ref => this.modal = ref}
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
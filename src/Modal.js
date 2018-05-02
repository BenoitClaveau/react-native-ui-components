import React, { PureComponent } from 'react';
import {
    Modal,
} from 'react-native';
import Toolbar from './Toolbar';
import SafeAreaView from './SafeAreaView';

class MyModal extends PureComponent {

    state = {
        modalVisible: false,
    }

    open() {
        const { onOpen } = this.props;
        this.setState({ 
            modalVisible: true
        }, () => {
            console.log("ONOPEN", onOpen)
            onOpen && onOpen();
        });
    }

    close() {
        const { onClose } = this.props;
        this.setState({ 
            modalVisible: false
        }, () => {
            onClose && onClose();
        });
    }

    render() {

        const {
            children,
            ...others
        } = this.props;

        return (
            <Modal
                animationType={"fade"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => this.close()}
            >
                <SafeAreaView>
                    <Toolbar
                        {...others}
                        close={() => this.close()}
                    />
                    {children}
                </SafeAreaView>
            </Modal>
        )
    }
};

export default MyModal;
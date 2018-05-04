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

    async open() {
        const { onOpen } = this.props;
        return await new Promise((resolve, reject) => {
            this.setState({
                modalVisible: true
            }, () => {
                onOpen && onOpen();
                resolve();
            });
        });
    }

    async close() {
        const { onClose } = this.props;
        return await new Promise((resolve, reject) => {
            this.setState({
                modalVisible: false
            }, () => {
                onClose && onClose();
                resolve();
            });
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
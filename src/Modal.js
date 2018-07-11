import React, { PureComponent } from 'react';
import {
    Modal,
} from 'react-native';
import SafeAreaView from './SafeAreaView';

class MyModal extends PureComponent {

    state = {
        modalVisible: false,
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.modalVisible == prevState.modalVisible) return null;
    //     return {
    //         modalVisible: nextProps.modalVisible
    //     }
    // }

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
            style,
            onOpen,
            onClose,
            onKeyboardDidShow,
            onKeyboardDidHide,
            ...others
        } = this.props;

        return (
            <Modal
                animationType={"fade"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => this.close()}
                {...others}
            >
                <SafeAreaView 
                    style={style}
                    onKeyboardDidShow={onKeyboardDidShow}
                    onKeyboardDidHide={onKeyboardDidHide}
                >
                    {children}
                </SafeAreaView>
            </Modal>
        )
    }
};

export default MyModal;
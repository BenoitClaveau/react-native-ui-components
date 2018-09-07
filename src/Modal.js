import React, { PureComponent } from 'react';
import {
    Modal,
} from 'react-native';
import SafeAreaView from './SafeAreaView';

class MyModal extends PureComponent {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.modalVisible !== this.props.modalVisible) {
            this.props.onComponentDidUpdate && this.props.onComponentDidUpdate(prevProps, prevState);
        }
    }

    render() {

        const {
            children,
            style,
            modalVisible,
            onRequestClose,
            onKeyboardDidShow,
            onKeyboardDidHide,
            ...others
        } = this.props;

        return (
            <Modal
                animationType={"fade"}
                transparent={false}
                visible={modalVisible}
                onRequestClose={onRequestClose}
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
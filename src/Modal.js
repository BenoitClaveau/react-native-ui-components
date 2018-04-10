import React, { PureComponent } from 'react';
import {
    View,
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
        this.setState({ modalVisible: true });
        onOpen && onOpen();
    }

    close() {
        const { onClose } = this.props;
        this.setState({ modalVisible: false });
        onClose && onClose();
    }

    render() {

        const {
            children,
            ...others
        } = this.props;

        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.close()}
                >
                    <SafeAreaView>
                        <Toolbar
                            {...others}
                            goBack={() => this.close()}
                        />
                        {children}
                    </SafeAreaView>
                </Modal>
            </View>
        )
    }
};

export default MyModal;
import { Alert } from 'react-native';

class Dialog {

    alert(message, title) {
        return new Promise((resolve, reject) => {
            Alert.alert(
                title || "Information",
                message,
                [
                    {
                        text: `CONTINUER`, onPress: () => {
                            resolve();
                        }
                    }
                ],
                { cancelable: true }
            )
        });
    }

    confirm(message, title) {
        return new Promise((resolve, reject) => {
            Alert.alert(
                title || "Confirmation",
                message,
                [
                    {
                        text: `VALIDER`, onPress: () => {
                            resolve();
                        }
                    },
                    {
                        text: `ANNULER`, onPress: () => {
                            reject();
                        }
                    },
                ],
                { cancelable: false }
            )
        });
    }
}


export default new Dialog();

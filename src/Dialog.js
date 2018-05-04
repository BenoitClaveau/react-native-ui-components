import { Alert } from 'react-native';

class Dialog {

    async alert(message, title) {
        return await new Promise((resolve, reject) => {
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

    async confirm(message, title) {
        return await new Promise((resolve, reject) => {
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

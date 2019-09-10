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
                            resolve({ validated: true });
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
                            resolve({ validated: true });
                        }
                    },
                    {
                        text: `ANNULER`, onPress: () => {
                            resolve({ canceled: true});
                        }
                    },
                ],
                { cancelable: false }
            )
        });
    }
}


export default new Dialog();

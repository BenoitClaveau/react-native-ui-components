import { Alert } from 'react-native';

class Dialog {
    
    alert(message) {
        return new Promise((resolve, reject) => {
            Alert.alert(
                `Erreur`, 
                message, 
                [
                    { text: `Continuer`, onPress: () => {
                        resolve();
                    }}
                ],
                { cancelable: true }
            )
        });
    }

    info(message) {
        return new Promise((resolve, reject) => {
            Alert.alert(
                `Information`, 
                message, 
                [
                    { text: `Continuer`, onPress: () => {
                        resolve();
                    }}
                ],
                { cancelable: true }
            )
        });
    }
}


export default new Dialog();

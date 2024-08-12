import { Alert, Linking } from 'react-native';
import { requestNotifications } from 'react-native-permissions'

export async function requestNotificationPermission() {
/*     requestNotifications(['alert', 'sound']).then(({ status, settings }) => {
        console.log('stat', status)
        if (status === 'blocked') {
            Alert.alert(
                'Warning',
                'Please enable notifications permission from settings',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Ayarlar',
                        onPress: () => Linking.openSettings(),
                    },
                ],
                { cancelable: false },
            );
        }
    }); */
}
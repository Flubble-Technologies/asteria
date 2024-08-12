// MyShowMessage.js
import { Dimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';


const { width } = Dimensions.get('window');

interface IMyShowMessage {
    message: string;
    description: string;
    type?: "none" | "default" | "info" | "success" | "danger" | "warning";
    duration?: number;
}

const MyShowMessage = ({ message, description, type = 'default', duration = 3000 }: IMyShowMessage) => {
    showMessage({
        message,
        description,
        titleStyle: { fontFamily: 'Outfit-SemiBold', fontSize: width * 0.044 },
        textStyle: { fontFamily: 'Outfit-Medium', fontSize: width * 0.039 },
        type,
        icon: 'auto',
        iconProps: { style: { width: 25, height: 25, aspectRatio: 1, marginRight: 7, tintColor: 'white', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' } },
        duration,
    });
};

export default MyShowMessage;
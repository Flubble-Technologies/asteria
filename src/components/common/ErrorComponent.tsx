
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { ApiErrorType } from "../../services/api.service";
import { errorMessages } from "../../types/IErrorMessages";
import WarningIcon from "../../assets/icons/warning";


const { height } = Dimensions.get('window');

interface Props {
    retryCallback: () => void;
    errorType: ApiErrorType | undefined;
}

export const ErrorComponent = ({ retryCallback, errorType }: Props) => {
    const errorMessage = errorMessages[errorType ?? ApiErrorType.UNKNOWN];
    
    return (
        <View style={styles.centeredView}>
            <WarningIcon />
            <Text style={styles.errorText}>Error!</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity onPress={retryCallback} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginTop: height * 0.15,
        alignItems: 'center',
        paddingHorizontal: 20, // Add some padding on the sides
    },
    errorText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#D9534F',
        marginTop: 10, // Add space above the text
    },
    errorMessage: {
        fontSize: 16,
        color: '#6c757d', // Muted text color
        textAlign: 'center',
        marginHorizontal: 10, // Add horizontal margin for better padding
        marginBottom: 30, // Space before the button
    },
    retryButton: {
        backgroundColor: '#D9534F',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 20, // More rounded corners
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500', // Semi-bold text
    },
});

export default ErrorComponent;

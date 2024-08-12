import React, { useState } from 'react';
import {
    Dimensions,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { UpdateProfileProps } from '../types/navigation';
import { useAuthContext } from '../context/auth/auth-context';
import MyShowMessage from '../components/common/MyShowMessage';
import { ApiErrorType } from '../services/api.service';
import { errorMessages } from '../types/IErrorMessages';
import { updateProfileApi } from '../api/requests/auth.api';

const { width } = Dimensions.get('window');

const UpdateProfile: React.FC<UpdateProfileProps> = ({ navigation }) => {
    const { user } = useAuthContext();

    if (!user) {
        return null;
    }

    const [fullName, setFullName] = useState<string>(user.fullName || '');
    const [email, setEmail] = useState<string>(user.email || '');
    const [password, setPassword] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleUpdateProfile = async () => {
        if (fullName.trim() === '') {
            MyShowMessage({
                message: 'Invalid Name',
                description: 'Full name cannot be empty.',
                type: 'danger',
            });
            return;
        }

        if (!validateEmail(email)) {
            MyShowMessage({
                message: 'Invalid Email',
                description: 'Please enter a valid email address.',
                type: 'danger',
            });
            return;
        }

        if (password && password.length <= 6) {
            MyShowMessage({
                message: 'Weak Password',
                description: 'Password must be more than 6 characters.',
                type: 'danger',
            });
            return;
        }

        try {
            await updateProfileApi({
                fullName,
                email,
                password: password || undefined,
            });
            MyShowMessage({
                message: 'Profile Updated',
                description: 'Your profile has been successfully updated!',
                type: 'success',
            });
        } catch (error: any) {
            MyShowMessage({
                message: 'Update Failed',
                description:
                    error.message
                        ? error.message
                        : errorMessages[error.type as ApiErrorType] ||
                        'Failed to update profile',
                type: 'danger',
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Update Profile</Text>
            </View>
            <View style={styles.body} onTouchStart={() => Keyboard.dismiss()}>
                <Text style={styles.textInputTitle}>Full Name</Text>
                <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Full Name"
                    autoCapitalize="words"
                    style={styles.textInput}
                    textContentType="name"
                />
                <Text style={styles.textInputTitle}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.textInput}
                    textContentType="emailAddress"
                />
                <Text style={styles.textInputTitle}>Password</Text>
                <TextInput
                    value={password}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    placeholder="New Password"
                    secureTextEntry
                    style={styles.textInput}
                    textContentType="newPassword"
                />
                <TouchableOpacity
                    onPress={handleUpdateProfile}
                    style={styles.updateButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.updateButtonText}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default UpdateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    header: {
        flex: 0.2,
        backgroundColor: '#1F3768',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    body: {
        flex: 0.8,
        paddingHorizontal: 25,
        justifyContent: 'center',
    },
    textInputTitle: {
        marginBottom: 10,
        color: '#303030',
        fontFamily: 'Outfit-Medium',
        fontSize: 18,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    updateButton: {
        backgroundColor: '#1F3768',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

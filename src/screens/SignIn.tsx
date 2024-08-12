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
import { SignInProps } from '../types/navigation';
import { useAuthContext } from '../context/auth/auth-context';
import MyShowMessage from '../components/common/MyShowMessage';
import { ApiErrorType } from '../services/api.service';
import { errorMessages } from '../types/IErrorMessages';

const SignInScreen: React.FC<SignInProps> = ({ navigation }) => {
    const { login } = useAuthContext();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            MyShowMessage({
                message: 'Invalid Email',
                description: 'Please enter a valid email address.',
                type: 'danger',
            });
            return;
        }

        if (password.length <= 6) {
            MyShowMessage({
                message: 'Weak Password',
                description: 'Password must be more than 6 characters.',
                type: 'danger',
            });
            return;
        }

        try {
            await login({
                email,
                password,
            });
        } catch (error: any) {
            MyShowMessage({
                message: 'Sign In Failed',
                description:
                    error.message
                        ? error.message
                        : errorMessages[error.type as ApiErrorType] ||
                        'Failed to sign in',
                type: 'danger',
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome Back</Text>
            </View>
            <View style={styles.body} onTouchStart={() => Keyboard.dismiss()}>
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
                    placeholder="Password"
                    secureTextEntry
                    style={styles.textInput}
                    textContentType="password"
                />
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.signInButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp', {})}>
                        <Text style={styles.signUpText}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignInScreen;

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
    signInButton: {
        backgroundColor: '#1F3768',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    footerText: {
        color: '#303030',
    },
    signUpText: {
        color: '#1F3768',
        fontWeight: 'bold',
    },
});

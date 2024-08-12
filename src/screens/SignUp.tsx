import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SignUpProps } from '../types/navigation';
import { useAuthContext } from '../context/auth/auth-context';
import MyShowMessage from '../components/common/MyShowMessage';
import { ApiErrorType } from '../services/api.service';
import { errorMessages } from '../types/IErrorMessages';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const SignUpScreen: React.FC<SignUpProps> = ({ navigation }) => {
    const { signUp } = useAuthContext();
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = async () => {
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

        if (password.length <= 6) {
            MyShowMessage({
                message: 'Weak Password',
                description: 'Password must be more than 6 characters.',
                type: 'danger',
            });
            return;
        }

        try {
            await signUp({
                email,
                fullName,
                password,
            }, {});
            MyShowMessage({
                message: 'Registration Successful',
                description: 'You have successfully registered!',
                type: 'success',
            });
        } catch (error: any) {
            MyShowMessage({
                message: 'Registration Failed',
                description:
                    error.message
                        ? error.message
                        : errorMessages[error.type as ApiErrorType] ||
                        'Failed to register',
                type: 'danger',
            });
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000000', '#0C0C0C', '#121212']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}>
                <ScrollView style={{ flex: 1, paddingHorizontal: 25, }} contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView />
                    <Image source={require('../assets/asteriaLogoPurple.png')} style={{ width: width * 0.65, height: width * 0.5, alignSelf: 'center', resizeMode: 'contain' }} />
                    <Text style={styles.headerText}>Sign Up</Text>
                    <View style={styles.body} onTouchStart={() => Keyboard.dismiss()}>
                        <TextInput
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="Full Name"
                            autoCapitalize="words"
                            style={styles.textInput}
                            textContentType="name"
                            placeholderTextColor="rgba(255,255,255,0.4)"

                        />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            style={styles.textInput}
                            textContentType="emailAddress"
                            placeholderTextColor="rgba(255,255,255,0.4)"

                        />
                        <TextInput
                            value={password}
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            placeholder="Password"
                            secureTextEntry
                            style={styles.textInput}
                            textContentType="password"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                        />
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={styles.signUpButton}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Text style={styles.signInText}> Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        color: '#fff',
        fontSize: width * 0.075,
        fontFamily: 'Outfit-SemiBold',
    },
    body: {
        marginTop: 25,
    },
    textInput: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.12)',
        padding: 16,
        borderRadius: 10,
        color: '#fff',
        fontSize: width * 0.04,
        fontFamily: 'Outfit-Medium',
        marginBottom: 15,
    },
    signUpButton: {
        backgroundColor: '#7E57C2',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: width * 0.047,
        fontFamily: 'Outfit-SemiBold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signInText: {
        color: '#7E57C2',
        fontFamily: 'Outfit-Bold',
    },
    footerText: {
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'Outfit-Regular',
    },
});

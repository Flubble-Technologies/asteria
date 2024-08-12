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
import { SignInProps } from '../types/navigation';
import { useAuthContext } from '../context/auth/auth-context';
import MyShowMessage from '../components/common/MyShowMessage';
import { ApiErrorType } from '../services/api.service';
import { errorMessages } from '../types/IErrorMessages';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

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
        <View style={styles.container}>
            <LinearGradient
                colors={['#000000', '#0C0C0C', '#121212']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <LottieView source={require('../assets/meditationLottie.json')} autoPlay loop={true} style={{ width: width * 1, padding: 380, marginTop: -170, alignSelf: 'center' }} />
                    <Image source={require('../assets/asteriaLogoWhite.png')} style={{ width: width * 0.4, height: width * 0.45, resizeMode: 'contain', alignSelf: 'center', position: 'absolute' }} />
                    <SafeAreaView />
                    <View style={styles.body} onTouchStart={() => Keyboard.dismiss()}>
                        <Text style={styles.headerText}>Sign In</Text>
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
                </ScrollView>
            </LinearGradient>

        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        color: '#fff',
        fontSize: width * 0.075,
        fontFamily: 'Outfit-SemiBold',
        marginBottom: 25,
    },
    body: {
        marginTop: -150,
        paddingHorizontal: 25,
        justifyContent: 'center',
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
    signInButton: {
        backgroundColor: '#7E57C2',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    signInButtonText: {
        color: '#fff',
        fontSize: width * 0.047,
        fontFamily: 'Outfit-SemiBold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    footerText: {
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'Outfit-Regular',
    },
    signUpText: {
        color: '#7E57C2',
        fontFamily: 'Outfit-Bold',
    },
});

import { StyleSheet, View, Image, Dimensions, SafeAreaView, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

const Splash = () => {

    const imageSize = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(imageSize, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();


    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1, zIndex: 99 }}>
            <LinearGradient
                colors={['#000000', '#0C0C0C', '#121212']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}
            >
                <SafeAreaView />
                <Animated.View
                    style={{
                        opacity: imageSize,
                        transform: [
                            {
                                scale: imageSize.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.5, 1],
                                }),
                            },
                        ],
                    }}
                >
                    <Image source={require('../assets/asteriaLogoPurple.png')} style={{ width: 280, height: 300, resizeMode: 'contain' }} />
                </Animated.View>
                <LottieView source={require('../assets/splashLoader.json')} autoPlay loop={true} style={{ padding: 90 }} />
            </LinearGradient>
        </GestureHandlerRootView>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import Onboarding from '../screens/Onboarding';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Loading from '../screens/Loading';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (

        <Stack.Navigator initialRouteName="Onboard" screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
            <Stack.Screen name="Onboard" component={Onboarding} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Loading" component={Loading} />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})
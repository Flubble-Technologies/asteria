import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (

        <Stack.Navigator initialRouteName="Onboard" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})
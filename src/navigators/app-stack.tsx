import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import BottomBarStack from './bottombar-stack';

const Stack = createNativeStackNavigator<AppStackParamList>();


const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
            <Stack.Screen name="BottomBar" component={BottomBarStack} />
        </Stack.Navigator>
    )
}

export default AppStack

const styles = StyleSheet.create({})
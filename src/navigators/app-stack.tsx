import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import BottomBarStack from './bottombar-stack';
import AsteriaChat from '../screens/AsteriaChat';
import AnalysisResult from '../screens/AnalyseResult';
import UpdateProfile from '../screens/UpdateProfile';

const Stack = createNativeStackNavigator<AppStackParamList>();


const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
            <Stack.Screen name="BottomBar" component={BottomBarStack} />
            <Stack.Screen name="AsteriaChat" component={AsteriaChat} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        </Stack.Navigator>
    )
}

export default AppStack
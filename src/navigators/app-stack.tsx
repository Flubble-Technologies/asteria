import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import BottomBarStack from './bottombar-stack';
import AsteriaChat from '../screens/AsteriaChat';
import AnalysisResult from '../screens/AnalyseResult';
import UpdateProfile from '../screens/UpdateProfile';
import { DreamProvider } from '../context/dream/dream-provider.';

const Stack = createNativeStackNavigator<AppStackParamList>();


const AppStack = () => {
    return (
        <DreamProvider>
            <Stack.Navigator screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
                <Stack.Screen name="BottomBar" component={BottomBarStack} />
                <Stack.Screen name="AsteriaChat" component={AsteriaChat} />
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            </Stack.Navigator>
        </DreamProvider>
    )
}

export default AppStack
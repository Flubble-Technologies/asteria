import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import CustomBottomBar from '../components/common/CustomBottomBar';
import Settings from '../screens/Settings';
import DreamDiary from '../screens/DreamDiary';
import StatisticsAndAnalysis from '../screens/StatisticsAndAnalysis';

const Stack = createBottomTabNavigator();

const BottomBarStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, }}
            initialRouteName="Home"
            tabBar={(props: BottomTabBarProps) => <CustomBottomBar {...props} />}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DreamDiary" component={DreamDiary} />
            <Stack.Screen name="StatisticsAndAnalysis" component={StatisticsAndAnalysis} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    )
}

export default BottomBarStack

const styles = StyleSheet.create({})
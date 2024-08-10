import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PremiumBox from '../components/Settings/PremiumBox';
import ManagementButtons from '../components/Settings/ManagementButtons';
import AppInteractionButtons from '../components/Settings/AppInteractionButtons';
import LogOutButton from '../components/Settings/LogOutButton';
import DeveloperSign from '../components/Settings/DeveloperSign';

const { width } = Dimensions.get('window');

const Settings = () => {
    return (
        <LinearGradient
            colors={['#000000', '#0a0a0a', '#000000']} // Siyah tonlarında gradyan renkleri
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView />
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>Settings</Text>
                <PremiumBox />
                <ManagementButtons />
                <AppInteractionButtons />
                <LogOutButton />
                <DeveloperSign />
            </ScrollView>
        </LinearGradient>
    );
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    text: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: width * 0.075,
        fontFamily: 'Outfit-Medium'
    },
});

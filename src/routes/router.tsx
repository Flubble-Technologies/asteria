import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppStack from '../navigators/app-stack';
import AuthStack from '../navigators/auth-stack';
import { useAuthContext } from '../context/auth/auth-context';

const Router = () => {
    //const [authenticated, setAuthenticated] = useState(true); //context'ten cekcez sonrasında
    const { authenticated } = useAuthContext();

    return <NavigationContainer >
        {authenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>;
}

export default Router

const styles = StyleSheet.create({})
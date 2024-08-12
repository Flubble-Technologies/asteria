import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Router from './src/routes/router'
import { AuthProvider } from './src/context/auth/auth'
import FlashMessage from 'react-native-flash-message'

const App = () => {
	return (
		<AuthProvider>
			<Router />
			<FlashMessage position="top" style={{gap: 7}}/>
		</AuthProvider>
	)
}

export default App

const styles = StyleSheet.create({})
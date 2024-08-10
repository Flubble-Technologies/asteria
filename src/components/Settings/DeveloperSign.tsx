import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')

const DeveloperSign = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Text style={styles.developedByText}>Developed by </Text>
            <Image source={require('../../assets/flubbleWhite.png')} style={{ width: 120, height: 40, resizeMode: 'contain', }} />
        </View>
    )
}

export default DeveloperSign

const styles = StyleSheet.create({
    developedByText: {
        color: '#A280DD',
        fontSize: width * 0.04,
        fontFamily: 'Outfit-Regular'
    }
})
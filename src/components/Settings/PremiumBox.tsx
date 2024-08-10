import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')

const PremiumBox = () => {
    return (
        <ImageBackground resizeMode='stretch' source={require('../../assets/skies/sky1.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../assets/dreambig.png')} style={styles.image} />
                    <Text style={styles.headerText}>Unlock the power of your dreams</Text>
                </View>
                <Text style={styles.description}>
                    Get unlimited access to all dream interpretations, sleep stories, meditations, and more with Premium
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Go Premium</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default PremiumBox

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        marginTop: 20,
        borderRadius: 15,
        overflow: 'hidden',
    },
    container: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        borderRadius: 15,
        padding: 25,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 55,
        height: 55,
        resizeMode: 'contain',
    },
    headerText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        marginLeft: 15,
        flex: 1,
    },
    description: {
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'Outfit-Regular',
        marginTop: 15,
    },
    button: {
        backgroundColor: '#7E57C2',
        padding: 12,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
});

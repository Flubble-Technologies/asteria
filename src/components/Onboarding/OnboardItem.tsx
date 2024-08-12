import React from 'react'
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window');

const OnboardItem = ({ item }: any) => {
    return (
        <View style={styles.renderItemContainer}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
    );
};

export default React.memo(OnboardItem)

const styles = StyleSheet.create({
    renderItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width
    },
    imageContainer: {
        width: '100%',
        height: '52%',
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    title: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.8)',
        fontFamily: 'Outfit-Regular',
        fontSize: width * 0.075,
        maxWidth: '80%',
        marginTop: 20,
    },
    subtitle: {
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'Outfit-Light',
        fontSize: width * 0.042,
        marginTop: 10,
        width,
        paddingHorizontal: 50,
        textAlign: 'center',
    },
})
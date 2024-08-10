import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Notification, Profile, Question, Share, Star2 } from '../../assets/icons';
import ArrowRight from '../../assets/icons/arrowRight';

const { width } = Dimensions.get('window');

const AppInteractionButtons = () => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.row}>
                <View style={styles.iconTextContainer}>
                    <View style={styles.iconBackground}>
                        <Question size={width * 0.04} color='#fff' />
                    </View>
                    <Text style={styles.text}>Help</Text>
                </View>
                <ArrowRight size={width * 0.045} color='#fff' />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.row}>
                <View style={styles.iconTextContainer}>
                    <View style={styles.iconBackground}>
                        <Star2 size={width * 0.04} color='#fff' />
                    </View>
                    <Text style={styles.text}>Rate Asteria</Text>
                </View>
                <ArrowRight size={width * 0.045} color='#fff' />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.row}>
                <View style={styles.iconTextContainer}>
                    <View style={styles.iconBackground}>
                        <Share size={width * 0.04} color='#fff' />
                    </View>
                    <Text style={styles.text}>Share Asteria</Text>
                </View>
                <ArrowRight size={width * 0.045} color='#fff' />
            </TouchableOpacity>
        </View>
    );
};

export default AppInteractionButtons;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#1F1F1F',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBackground: {
        backgroundColor: '#7E57C2',
        padding: 7,
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontFamily: 'Outfit-Medium',
        fontSize: width * 0.045,
        marginLeft: 15,
    },
    separator: {
        height: 1,
        marginHorizontal: 20,
        backgroundColor: 'rgba(255,255,255,0.07)',
    },
});

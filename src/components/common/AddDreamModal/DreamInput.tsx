import React from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';

const { width } = Dimensions.get('window');

const DreamInput = () => {
    return (
        <View>
            <TextInput
                style={styles.titleInput}
                placeholder='Add a dream title'
                placeholderTextColor='rgba(255,255,255,0.3)'
            />
            <TextInput
                style={styles.descriptionInput}
                placeholder='Add a dream with all the details (place, objects, people, etc.)'
                placeholderTextColor='rgba(255,255,255,0.3)'
                multiline
            />
        </View>
    );
};

export default DreamInput;

const styles = StyleSheet.create({
    titleInput: {
        color: '#fff',
        fontSize: width * 0.045,
        fontFamily: 'Outfit-Regular',
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        padding: 15,
        paddingVertical: 18,
        marginTop: 10
    },
    descriptionInput: {
        height: 140,
        marginTop: 15,
        color: '#fff',
        fontSize: width * 0.045,
        fontFamily: 'Outfit-Regular',
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        padding: 15,
        textAlignVertical: 'top'
    }
});

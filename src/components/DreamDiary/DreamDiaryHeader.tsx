import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Search } from '../../assets/icons';

const { width } = Dimensions.get('window');

const DreamDiaryHeader = () => {
    const [selectedType, setSelectedType] = useState('All');
    const [searchVisible, setSearchVisible] = useState(false);

    return (
        <>
            <Text style={styles.text}>Dream Diary</Text>
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={[styles.searchButton, searchVisible && styles.selectedButton]} onPress={() => setSearchVisible(!searchVisible)}>
                    <Search size={width * 0.05} color='rgba(255,255,255,1)' />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, selectedType === 'All' && styles.selectedButton]} onPress={() => setSelectedType('All')}>
                    <Text style={[styles.buttonText, selectedType === 'All' && styles.selectedButtonText]}>
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, selectedType === 'Dream' && styles.selectedButton]} onPress={() => setSelectedType('Dream')} >
                    <Text style={[styles.buttonText, selectedType === 'Dream' && styles.selectedButtonText]}>
                        Dream
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, selectedType === 'Nightmare' && styles.selectedButton]} onPress={() => setSelectedType('Nightmare')} >
                    <Text style={[styles.buttonText, selectedType === 'Nightmare' && styles.selectedButtonText]}>
                        Nightmare
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, selectedType === 'Lucid' && styles.selectedButton]} onPress={() => setSelectedType('Lucid')}>
                    <Text style={[styles.buttonText, selectedType === 'Lucid' && styles.selectedButtonText]} >
                        Lucid
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            {searchVisible && (
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search in your dreams"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                />
            )}
        </>
    );
};

export default DreamDiaryHeader;

const styles = StyleSheet.create({
    text: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: width * 0.075,
        fontFamily: 'Outfit-Medium',
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    searchButton: {
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 55,
        padding: 15,
        marginBottom: 15,
        marginRight: 5,
    },
    searchInput: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.12)',
        padding: 16,
        borderRadius: 10,
        color: '#fff',
        fontSize: width * 0.04,
        fontFamily: 'Outfit-Medium',
        marginBottom: 15,
    },
    tabButton: {
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 10,
        paddingHorizontal: 17,
        paddingVertical: 13,
        marginBottom: 15,
        marginHorizontal: 5,
    },
    selectedButton: {
        backgroundColor: '#7E57C2', // Seçili olan butonun arka plan rengi
    },
    buttonText: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: width * 0.04,
        fontFamily: 'Outfit-Medium',
    },
    selectedButtonText: {
        color: '#fff', // Seçili butonun metin rengi
    },
});

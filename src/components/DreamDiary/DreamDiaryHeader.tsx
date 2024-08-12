import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform } from 'react-native';
import React, { useState } from 'react';
import { Search } from '../../assets/icons';
import { DreamType } from '../../constants/dream-types';

const { width } = Dimensions.get('window');


interface DreamDiaryHeaderProps {
    searchVisible: boolean
    selectedType: DreamType | null
    setSearchVisible: (visible: boolean) => void
    setSelectedType: (type: DreamType | null) => void
    searchTextInput: string
    setSearchTextInput: (text: string) => void
}

const DreamDiaryHeader = ({ searchVisible, selectedType, setSelectedType, setSearchVisible, searchTextInput, setSearchTextInput }: DreamDiaryHeaderProps) => {


    return (
        <>
            <Text style={
                [styles.text, {
                    marginTop: Platform.OS === 'android' ? 10 : 0,
                }]
                }>Dream Diary</Text>
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={[styles.searchButton, searchVisible && styles.selectedButton]} onPress={() => setSearchVisible(!searchVisible)}>
                    <Search size={width * 0.05} color='rgba(255,255,255,1)' />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, selectedType === null && styles.selectedButton]} onPress={() => setSelectedType(null)}>
                    <Text style={[styles.buttonText, selectedType === null && styles.selectedButtonText]}>
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, selectedType === DreamType.DREAM && styles.selectedButton]} onPress={() => setSelectedType(DreamType.DREAM)} >
                    <Text style={[styles.buttonText, selectedType === DreamType.DREAM && styles.selectedButtonText]}>
                        Dream
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, selectedType === DreamType.NIGHTMARE && styles.selectedButton]} onPress={() => setSelectedType(DreamType.NIGHTMARE)} >
                    <Text style={[styles.buttonText, selectedType === DreamType.NIGHTMARE && styles.selectedButtonText]}>
                        Nightmare
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, selectedType === DreamType.LUCID && styles.selectedButton]} onPress={() => setSelectedType(DreamType.LUCID)}>
                    <Text style={[styles.buttonText, selectedType === DreamType.LUCID && styles.selectedButtonText]} >
                        Lucid
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            {searchVisible && (
                <TextInput
                    style={styles.searchInput}
                    value={searchTextInput}
                    onChangeText={setSearchTextInput}
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

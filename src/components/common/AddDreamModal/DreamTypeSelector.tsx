import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Eye, Rain, Sun } from '../../../assets/icons';

const { width } = Dimensions.get('window');

interface DreamTypeSelectorProps {
    selectedType: string | null;
    handleSelection: (type: string) => void;
}

const DreamTypeSelector = ({ selectedType, handleSelection }: DreamTypeSelectorProps) => {
    return (
        <View>
            <View style={styles.typeContainer}>
                <TouchableOpacity
                    style={[styles.button, selectedType === 'dream' && styles.selectedButton]}
                    onPress={() => handleSelection('dream')}
                >
                    <Sun size={width * 0.1} color={selectedType === 'dream' ? '#fff' : 'rgba(255,255,255,0.5)'} />
                    <Text style={[styles.text, selectedType === 'dream' && styles.selectedText]}>Dream</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, selectedType === 'nightmare' && styles.selectedButton]}
                    onPress={() => handleSelection('nightmare')}
                >
                    <Rain size={width * 0.1} color={selectedType === 'nightmare' ? '#fff' : 'rgba(255,255,255,0.5)'} />
                    <Text style={[styles.text, selectedType === 'nightmare' && styles.selectedText]}>Nightmare</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, selectedType === 'lucid' && styles.selectedButton]}
                    onPress={() => handleSelection('lucid')}
                >
                    <Eye size={width * 0.1} color={selectedType === 'lucid' ? '#fff' : 'rgba(255,255,255,0.5)'} />
                    <Text style={[styles.text, selectedType === 'lucid' && styles.selectedText]}>Lucid</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DreamTypeSelector;

const styles = StyleSheet.create({
    typeText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: width * 0.05,
        fontFamily: 'Outfit-Medium',
        marginTop: 15
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 15
    },
    button: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        paddingVertical: 20
    },
    selectedButton: {
        backgroundColor: '#7E57C2',
    },
    text: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: width * 0.045,
        fontFamily: 'Outfit-Medium',
        marginTop: 10
    },
    selectedText: {
        color: '#fff',
    }
});

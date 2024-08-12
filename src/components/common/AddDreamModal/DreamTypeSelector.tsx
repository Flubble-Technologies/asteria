import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Eye, Rain, Sun } from '../../../assets/icons';
import { DreamType } from '../../../constants/dream-types';


const { width } = Dimensions.get('window');

interface DreamTypeSelectorProps {
    selectedType: DreamType | null;
    handleSelection: (type: DreamType) => void;
}

const DreamTypeSelector = ({ selectedType, handleSelection }: DreamTypeSelectorProps) => {
    return (
        <View>
            <View style={styles.typeContainer}>
                <TouchableOpacity
                    style={[styles.button, selectedType === DreamType.DREAM && styles.selectedButton]}
                    onPress={() => handleSelection(DreamType.DREAM)}
                >
                    <Sun size={width * 0.1} color={selectedType === DreamType.DREAM ? '#fff' : 'rgba(255,255,255,0.5)'} />
                    <Text style={[styles.text, selectedType === DreamType.DREAM && styles.selectedText]}>Dream</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, selectedType === DreamType.NIGHTMARE && styles.selectedButton]}
                    onPress={() => handleSelection(DreamType.NIGHTMARE)}
                >
                    <Rain size={width * 0.1} color={selectedType === DreamType.NIGHTMARE ? '#fff' : 'rgba(255,255,255,0.5)'} />
                    <Text style={[styles.text, selectedType === DreamType.NIGHTMARE && styles.selectedText]}>Nightmare</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, selectedType === DreamType.LUCID && styles.selectedButton]}
                    onPress={() => handleSelection(DreamType.LUCID)}
                >
                    <Eye size={width * 0.1} color={selectedType === DreamType.LUCID ? '#fff' : 'rgba(255,255,255,0.5)'} />
                    <Text style={[styles.text, selectedType === DreamType.LUCID && styles.selectedText]}>Lucid</Text>
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

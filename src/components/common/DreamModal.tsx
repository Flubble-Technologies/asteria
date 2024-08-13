// ImageModal.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import PagerView from 'react-native-pager-view';
import ZoomableImage from './ZoomableImage';
import { Star2 } from '../../assets/icons';
import TruncatableText from './TruncatableText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../types/navigation';
import { IDream } from '../../types/IDream';
import { DreamAnalysisCategories } from '../../constants/dream-analysis-categories';
import { TimeFrame } from '../../constants/time-frame';

const { width, height } = Dimensions.get('window');

interface DreamModalProps {
    isVisible: boolean;
    toggleModal: () => void;
    selectedStar: IDream | null;
}

const DreamModal = ({ isVisible, toggleModal, selectedStar }: DreamModalProps) => {

    if (!selectedStar) {
        return null;
    }

    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={toggleModal}
            animationIn="wobble"
            style={{ justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <View style={styles.modalContent}>
                <PagerView
                    style={styles.pagerView}
                    orientation='horizontal'
                    transitionStyle='curl'
                    initialPage={0}
                    scrollEnabled={true}>
                    {selectedStar?.images.map((image, index) => (
                        <View key={index}>
                            <ZoomableImage imageUrl={`https://856d796f7630.ngrok.app/${image.image}`} />
                        </View>
                    ))}
                </PagerView>
                <View style={styles.dateBackground} pointerEvents="none">
                    <Text style={styles.dateText}>{selectedStar.date}</Text>
                </View>
                <View style={styles.dreamDescriptionBackground} >
                    <Text style={styles.dreamTitle}>
                        {selectedStar.title}
                    </Text>
                    <TruncatableText text={selectedStar.description} limit={140} />
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
                toggleModal();
                navigation.navigate('AsteriaChat', {dream: selectedStar, selectedCategory: DreamAnalysisCategories.EmotionalStateAnalysis, timeFrame: TimeFrame.weekly});
            }}>
                <Star2 size={width * 0.04} color="#fff" />
                <Text style={styles.buttonText}>Dream Interpretation with Asteria</Text>
                <Star2 size={width * 0.04} color="#fff" />
            </TouchableOpacity>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContent: {
        width: width,
        height: height * 0.55,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateBackground: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 11,
        paddingVertical: 5,
        borderRadius: 7,
        position: 'absolute',
        top: 7,
        right: 7,
        zIndex: 99
    },
    dateText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: width * 0.036,
        fontFamily: 'Bangers-Regular',
    },
    pagerView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dreamDescriptionBackground: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        padding: 15,
        borderRadius: 10,
        bottom: 5,
        zIndex: 99
    },
    dreamTitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: width * 0.05,
        fontFamily: 'Bangers-Regular',
    },
    button: {
        backgroundColor: '#7E57C2',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 25,
        gap: 10,
        zIndex: 100
    },
    buttonText: {
        color: '#fff',
        fontSize: width * 0.048,
        fontFamily: 'Bangers-Regular',
    },
});

export default DreamModal;

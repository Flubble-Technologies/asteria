import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    Text,
    Platform,
    ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DreamInput from './DreamInput';
import DatePickerComponent from './DatePicker';
import DreamTypeSelector from './DreamTypeSelector';
import DreamProcessingModal from '../DreamProcessingModal';
import { DreamType } from '../../../constants/dream-types';
import { createDreamApi } from '../../../api/requests/dreams.api';
import MyShowMessage from '../MyShowMessage';
import { IDream } from '../../../types/IDream';

const { height, width } = Dimensions.get('window');

interface AddDreamModalProps {
    openAddDreamModal: boolean;
    toggleModal: () => void;
}

const AddDreamModal = ({ openAddDreamModal, toggleModal }: AddDreamModalProps) => {
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [dreamTitle, setDreamTitle] = useState('');
    const [dream, setDream] = useState<IDream | null>(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [dreamDescription, setDreamDescription] = useState('');
    const [showProcessingModal, setShowProcessingModal] = useState(false);
    const [selectedType, setSelectedType] = useState<DreamType>(DreamType.DREAM);
    const [currentPhase, setCurrentPhase] = useState<'interpreting' | 'cartoonizing' | 'completed'>('interpreting');

    const getRandomXandY = () => {
        const padding = 100;
        const x = Math.floor(Math.random() * (width - padding * 2)) + padding;
        const y = Math.floor(Math.random() * (height - padding * 2)) + padding;
        return { x, y };
    }
    

    const addDream = () => {
        if (dreamTitle.length === 0 || dreamDescription.length === 0) {
            MyShowMessage({
                message: 'Missing Information',
                description: 'Please fill in all fields.',
                type: 'danger',
            });
            return;
        }
        setShowProcessingModal(true);
        setCurrentPhase('interpreting');
        let { x, y } = { x: 0, y: 0 };
        ({ x, y } = getRandomXandY());

        if (x < 0 || y < 0) {
            ({ x, y } = getRandomXandY());
        }

        setLoading(true);
        createDreamApi({
            date,
            initialX: x,
            initialY: y,
            title: dreamTitle,
            type: selectedType,
            description: dreamDescription,
        })
            .then((response) => {
                MyShowMessage({
                    message: 'Dream added successfully',
                    description: 'Your dream has been added successfully',
                    type: 'success',
                });
                setDream(response);
                setCurrentPhase('cartoonizing'); // Update phase to cartoonizing
                setLoading(false);
                setDreamTitle('');
                setDreamDescription('');
            })
            .catch(() => {
                MyShowMessage({
                    message: 'Failed to add dream',
                    description: 'An error occurred while adding your dream. Please try again',
                    type: 'danger',
                });
                setLoading(false);
                setShowProcessingModal(false);
            });
    };

    return (
        <Modal
            isVisible={openAddDreamModal}
            onSwipeComplete={toggleModal}
            onBackdropPress={toggleModal}
            swipeDirection="down"
            style={styles.modalStyle}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={styles.keyboardAvoidingView}
                extraHeight={Platform.OS === 'ios' ? height * 0.25 : 0}
                enableOnAndroid={true}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <View style={styles.swipeIndicator} />
                        <View style={styles.innerContainer}>
                            <DreamInput
                                dreamTitle={dreamTitle}
                                setDreamTitle={setDreamTitle}
                                dreamDescription={dreamDescription}
                                setDreamDescription={setDreamDescription}
                            />
                            <DatePickerComponent
                                date={date}
                                setDate={setDate}
                                openDatePicker={openDatePicker}
                                setOpenDatePicker={setOpenDatePicker}
                            />
                            <DreamTypeSelector
                                selectedType={selectedType}
                                handleSelection={setSelectedType}
                            />
                            <TouchableOpacity style={styles.addButton} onPress={addDream}>
                                <Text style={styles.addButtonText}>Add Dream</Text>
                            </TouchableOpacity>
                            {loading && (
                                <View style={styles.loadingOverlay}>
                                    <ActivityIndicator size="large" color="#fff" />
                                </View>
                            )}
                            <SafeAreaView />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <DreamProcessingModal
                    isLoading={loading}
                    dreamId={dream?.id || null}
                    isVisible={showProcessingModal}
                    onClose={() => setShowProcessingModal(false)}
                    currentPhase={currentPhase}
                    setCurrentPhase={setCurrentPhase}
                />
            </KeyboardAwareScrollView>
        </Modal>
    );
};

export default AddDreamModal;

const styles = StyleSheet.create({
    modalStyle: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    keyboardAvoidingView: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#1F1F1F',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    swipeIndicator: {
        alignSelf: 'center',
        width: 40,
        height: 7,
        borderRadius: 50,
        backgroundColor: '#585757',
        marginTop: 10,
    },
    innerContainer: {
        marginHorizontal: 5,
        padding: 15,
    },
    addButton: {
        backgroundColor: '#7E57C2',
        padding: 17,
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 25,
    },
    addButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontFamily: 'Outfit-Medium',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(31, 31, 31, 0.8)', // Slightly darker to emphasize the loading state
    },
});

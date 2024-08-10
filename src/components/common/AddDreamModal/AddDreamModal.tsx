import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Text, Platform } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DreamInput from './DreamInput';
import DatePickerComponent from './DatePicker';
import DreamTypeSelector from './DreamTypeSelector';

const { height, width } = Dimensions.get('window');

interface AddDreamModalProps {
    openAddDreamModal: boolean;
    toggleModal: () => void;
}

const AddDreamModal = ({ openAddDreamModal, toggleModal }: AddDreamModalProps) => {
    const [selectedType, setSelectedType] = useState<string | null>('dream');
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

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
                            <DreamInput />
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
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={toggleModal}
                            >
                                <Text style={styles.addButtonText}>Add Dream</Text>
                            </TouchableOpacity>
                            <SafeAreaView />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </Modal>
    );
};

export default AddDreamModal;

const styles = StyleSheet.create({
    modalStyle: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    keyboardAvoidingView: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#1F1F1F',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    swipeIndicator: {
        alignSelf: 'center',
        width: 40,
        height: 7,
        borderRadius: 50,
        backgroundColor: '#585757',
        marginTop: 10
    },
    innerContainer: {
        marginHorizontal: 5,
        padding: 15
    },
    addButton: {
        backgroundColor: '#7E57C2',
        padding: 17,
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 25
    },
    addButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontFamily: 'Outfit-Medium'
    }
});

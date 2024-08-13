import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from '../../../assets/icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

interface DatePickerProps {
    date: Date;
    setDate: (date: Date) => void;
    openDatePicker: boolean;
    setOpenDatePicker: (open: boolean) => void;
}

const DatePickerComponent = ({ date, setDate, openDatePicker, setOpenDatePicker }: DatePickerProps) => {




    const renderDatePickerByPlatform = () => {
        if (Platform.OS === 'ios') {
            return (
                <Modal
                    isVisible={openDatePicker}
                    onBackdropPress={() => setOpenDatePicker(false)}
                    style={styles.datePickerModal}
                >
                    <View style={styles.datePickerContainer}>
                        <DateTimePicker
                            id='dateTimePicker'
                            mode='date'
                            value={date}
                            display='spinner'
                            style={styles.dateTimePicker}
                            textColor='#fff'
                            onChange={handleDateChange}
                        />
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={() => setOpenDatePicker(false)}
                        >
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

            )
        } else {
            return (
                <>
                    {openDatePicker &&
                        <DateTimePicker
                            id='dateTimePicker'
                            mode={undefined}
                            value={date}
                            display={'default'}
                            style={styles.dateTimePicker}
                            textColor='#fff'
                            onChange={handleDateChange}
                        />}
                </>

            )
        }
    }



    const handleDateChange = (event: any, selectedDate: any) => {

        const currentDate = selectedDate || date;
        setDate(currentDate);
        setOpenDatePicker(Platform.OS === 'ios');
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setOpenDatePicker(true)}
            >
                <View style={styles.datePickerContent}>
                    <Calendar size={width * 0.052} color='rgba(255,255,255,0.5)' />
                    <Text style={styles.datePickerText}>Date</Text>
                </View>
                <Text style={styles.dateText}>{dayjs(date).format('DD MMM YYYY')}</Text>
            </TouchableOpacity>
            {renderDatePickerByPlatform()}
        </View>
    );
};

export default DatePickerComponent;

const styles = StyleSheet.create({
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        padding: 15,
        paddingVertical: 18
    },
    datePickerContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    datePickerText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: width * 0.046,
        fontFamily: 'Outfit-Medium',
        marginLeft: 8
    },
    dateText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: width * 0.047,
        fontFamily: 'Outfit-Medium'
    },
    datePickerModal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    datePickerContainer: {
        backgroundColor: '#2A2A2A',
        padding: 20,
        borderRadius: 20
    },
    dateTimePicker: {
        backgroundColor: '#2A2A2A',
        borderRadius: 8
    },
    doneButton: {
        backgroundColor: '#7E57C2',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    doneButtonText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontFamily: 'Outfit-Medium'
    }
});

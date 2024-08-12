import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Notification, Profile } from '../../assets/icons';
import ArrowRight from '../../assets/icons/arrowRight';
import { GestureHandlerRootView, Switch } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { requestNotificationPermission } from '../../utils/notification-permission';

const { width } = Dimensions.get('window');

const ManagementButtons = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const navigation = useNavigation<any>();

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        requestNotificationPermission().then(() => {
            setIsEnabled(true);
        });
    }, [isEnabled]);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.row}>
                <View style={styles.iconTextContainer}>
                    <View style={styles.iconBackground}>
                        <Notification size={width * 0.04} color='#fff' />
                    </View>
                    <Text style={styles.text}>Notifications</Text>
                </View>
                <Switch
                    thumbColor='#7E57C2'
                    trackColor={{ false: 'rgba(255,255,255,0.2)', true: 'rgba(126,87,194,0.25)' }}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('UpdateProfile')}>
                <View style={styles.iconTextContainer}>
                    <View style={styles.iconBackground}>
                        <Profile size={width * 0.04} color='#fff' />
                    </View>
                    <Text style={styles.text}>Update Profile</Text>
                </View>
                <ArrowRight size={width * 0.045} color='#fff' />
            </TouchableOpacity>
        </GestureHandlerRootView>
    );
};

export default ManagementButtons;

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

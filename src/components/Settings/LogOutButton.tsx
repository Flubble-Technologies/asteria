import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ArrowRight from '../../assets/icons/arrowRight'
import { LogOut, Question } from '../../assets/icons'
import { useAuthContext } from '../../context/auth/auth-context'

const { width } = Dimensions.get('window')

const LogOutButton = () => {

    const { logout } = useAuthContext()

    return (
        <TouchableOpacity style={styles.row} onPress={() => logout(true)}>
            <View style={styles.iconTextContainer}>
                <View style={styles.iconBackground}>
                    <LogOut size={width * 0.04} color='#fff' />
                </View>
                <Text style={styles.text}>Log Out</Text>
            </View>
        </TouchableOpacity>
    )
}

export default LogOutButton

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        backgroundColor: '#1F1F1F',
        marginTop: 20,
        borderRadius: 10,
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBackground: {
        backgroundColor: '#E40000',
        padding: 7,
        borderRadius: 5,
    },
    text: {
        color: '#E40000',
        fontFamily: 'Outfit-Medium',
        fontSize: width * 0.045,
        marginLeft: 15,
    },
})
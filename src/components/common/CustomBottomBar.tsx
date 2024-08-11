import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions, StyleSheet, SafeAreaView, TouchableOpacity, View, Text } from 'react-native';

import { Book, Chart, Chart3, Settings, Star2, Star3 } from '../../assets/icons/index';
import Chart2 from '../../assets/icons/chart2';
import Modal from 'react-native-modal';
import AddDreamModal from './AddDreamModal/AddDreamModal';

const { height, width } = Dimensions.get('window');

interface CustomBottomBarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

const CustomBottomBar = ({ state, navigation }: CustomBottomBarProps) => {
    const [selectedButton, setSelectedButton] = useState('Home');
    const [openAddDreamModal, setOpenAddDreamModal] = useState(false);

    const toggleModal = () => {
        setOpenAddDreamModal(!openAddDreamModal);
    }

    const handleButtonPress = (buttonName: any, routeName: any) => {
        setSelectedButton(buttonName);
        navigation.navigate(routeName);
    };

    const isHomePage = state.routes[state.index].name === 'Home';

    return (
        <View style={{ backgroundColor: '#000' }}>
            <SafeAreaView>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#1F1F1F', '#1F1F1F']}
                    style={[
                        styles.linearGradient,
                        isHomePage
                            ? styles.homeLinearGradient
                            : styles.otherLinearGradient
                    ]}
                >
                    {state.routes.map((route: any, index: any) => {
                        const isFocused = state.index === index;
                        const onPress = () => {
                            handleButtonPress(route.name, route.name);
                        };

                        const Icon = () => {
                            if (route.name === 'Home') return <Star3 size={width * 0.055} color='#fff' />;
                            else if (route.name === 'DreamDiary') return <Book size={width * 0.055} color='#fff' />;
                            else if (route.name === 'StatisticsAndAnalysis') return <Chart3 size={width * 0.055} color='#fff' />;
                            else if (route.name === 'Settings') return <Settings size={width * 0.055} color='#fff' />;
                        };

                        const buttonStyle = [
                            styles.button,
                            isFocused && styles.selectedButton,
                            route.name === 'DreamDiary' && { marginRight: width * 0.10 },
                            route.name === 'StatisticsAndAnalysis' && { marginLeft: width * 0.10 },
                        ];

                        return (
                            <TouchableOpacity
                                key={route.key}
                                onPress={onPress}
                                style={buttonStyle}
                            >
                                <Icon />
                            </TouchableOpacity>
                        );
                    })}
                </LinearGradient>
                <TouchableOpacity
                    onPress={toggleModal}
                    style={styles.plusButton}
                >
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <AddDreamModal openAddDreamModal={openAddDreamModal} toggleModal={toggleModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        width: '90%',
        padding: 4,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 5,
    },
    homeLinearGradient: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    otherLinearGradient: {
        borderRadius: 10,
    },
    button: {
        opacity: 0.4,
        paddingHorizontal: height * 0.020,
        paddingVertical: height * 0.018,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        opacity: 1,
        backgroundColor: '#7E57C2',
        borderRadius: 5,
        paddingVertical: height * 0.009,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)'
    },
    plusButton: {
        position: 'absolute',
        top: -17,
        left: width / 2 - 25,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#7E57C2',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    plusText: {
        color: '#fff',
        fontSize: width * 0.07,
    },
});

export default CustomBottomBar;

import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Eye, Rain, Sun } from '../../assets/icons';
import { DreamType } from '../../constants/dream-types';
import { IDream } from '../../types/IDream';

const { width } = Dimensions.get('window');

interface DiaryItemProps {
    item: IDream;
    index: number;
    toggleModal: (item: IDream) => void;
}

const backgroundImages = [
    require('../../assets/skies/sky1.jpg'),
    require('../../assets/skies/sky2.jpg'),
    require('../../assets/skies/sky3.jpg'),
    require('../../assets/skies/sky4.jpg'),
    require('../../assets/skies/sky5.jpg'),
    require('../../assets/skies/sky6.jpg'),
    require('../../assets/skies/sky7.jpg'),
];

const chooseIcon = (type: DreamType) => {
    if (type === DreamType.DREAM) {
        return <Sun size={width * 0.055} color='rgba(255,255,255,0.8)' />;
    } else if (type === DreamType.NIGHTMARE) {
        return <Rain size={width * 0.055} color='rgba(255,255,255,0.8)' />;
    } else if (type === DreamType.LUCID) {
        return <Eye size={width * 0.055} color='rgba(255,255,255,0.8)' />;
    }
}

const DiaryItem = ({ item, toggleModal, index }: DiaryItemProps) => {
    const backgroundImage = backgroundImages[index % backgroundImages.length];

    if (!item) {
        return null;
    }

    return (
        <TouchableOpacity style={styles.touchable} onPress={() => toggleModal(item)}>
            <ImageBackground
                source={backgroundImage}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
            >
                <View style={styles.innerContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.iconBackground}>
                            {chooseIcon(item.type)}
                        </View>
                        <View style={styles.dateBackground}>
                            <Text style={styles.dateText}>
                                {item.date}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.nameText}>
                        {item.title}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default DiaryItem

const styles = StyleSheet.create({
    touchable: {
        marginBottom: 15,
        width: '100%',
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        overflow: 'hidden'
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    imageStyle: {
        borderRadius: 10
    },
    innerContainer: {
        flex: 1,
        padding: 13,
        justifyContent: 'space-between',
    },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconBackground: {
        backgroundColor: 'rgba(255,255,255,0.09)',
        borderRadius: 50,
        padding: 10
    },
    dateBackground: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 11,
        paddingVertical: 5,
        borderRadius: 7,
    },
    dateText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: width * 0.037,
        fontFamily: 'Outfit-Regular'
    },
    nameText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: width * 0.054,
        fontFamily: 'Outfit-SemiBold'
    }
});

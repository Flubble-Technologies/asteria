import React, { useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ArrowLeft, Loop } from '../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';

const { width, height } = Dimensions.get('window');

interface AsteriaChatProps {
    route: {
        params: {
            id?: number; // Dream interpretation parameters
            color?: string;
            initialX?: number;
            initialY?: number;
            date?: string;
            dreamTitle?: string;
            dreamDescription?: string;
            interpretation?: string;
            type?: string;
            analysisData?: { // Analysis data
                title: string;
                timeFrame: string;
                results: string;
            }
        }
    }
}

const AsteriaChat = ({ route }: AsteriaChatProps) => {
    const { dreamTitle, dreamDescription, interpretation, analysisData } = route.params;
    console.log("Received Analysis Data:", analysisData);

    const dynamicIconSize = (dreamTitle || analysisData?.title)?.length * 10.7 || 0;
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [interpretationOrResults, setInterpretationOrResults] = useState('');
    const [loading, setLoading] = useState({
        description: true,
        interpretationOrResults: true
    });

    const slideAnim = useState(new Animated.Value(width))[0];

    useEffect(() => {
        const typeWriter = (
            text: string,
            setText: React.Dispatch<React.SetStateAction<string>>,
            onComplete: () => void,
            speed = 50
        ) => {
            let index = 0;
            const interval = setInterval(() => {
                setText((prev) => prev + text.charAt(index));
                index++;
                if (index === text.length) {
                    clearInterval(interval);
                    onComplete();
                }
            }, speed);
        };

        const timeframeMapping: { [key: string]: string } = {
            'weekly': '7-day',
            'monthly': '30-day',
            'yearly': 'yearly',
            'allTime': 'all-time'
        };

        const handleTitle = dreamTitle || `${analysisData?.title} (${timeframeMapping[analysisData?.timeFrame || '']})` || '';

        typeWriter(handleTitle, setTitle, () => {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();

            setLoading((prev) => ({ ...prev, description: false }));

            const analysisDescription = analysisData 
                ? `Asteria, can you show me the ${timeframeMapping[analysisData.timeFrame]} analysis of my ${analysisData.title}?` 
                : '';

            const handleDescription = dreamDescription || analysisDescription;
            
            typeWriter(handleDescription, setDescription, () => {
                setLoading((prev) => ({ ...prev, interpretationOrResults: false }));
                const handleInterpretationOrResults = interpretation || analysisData?.results || '';
                typeWriter(handleInterpretationOrResults, setInterpretationOrResults, () => { }, 30);
            }, 30);
        });

    }, [dreamTitle, analysisData, slideAnim]);

    return (
        <LinearGradient
            colors={['#000000', '#0a0a0a', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <GestureHandlerRootView style={{ flex: 1, paddingHorizontal: 20 }}>
                <SafeAreaView />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <ArrowLeft size={width * 0.06} color="rgba(255,255,255,0.8)" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Asteria AI</Text>
                    <View />
                </View>
                <View>
                    <Image source={require('../assets/asteria.png')} style={{ width: width * 1, height: height * 0.25, alignSelf: 'center', resizeMode: 'contain' }} />
                    <Image source={require('../assets/cloud2.png')} style={{ width: width * 1, height: height * 0.15, alignSelf: 'center', position: 'absolute', bottom: 0, zIndex: -1 }} />
                </View>
                <ScrollView style={{ marginTop: 15 }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.iconAndTitleContainer}>
                        <Text style={styles.dreamTitle}>{dreamTitle ? 'Dream interpretation of' : 'Analysis Results for'}</Text>
                        {dreamTitle !== undefined ?
                            <View style={{ marginLeft: 5, position: 'relative' }}>
                                <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
                                    <Loop size={dynamicIconSize} color="#7E57C2" />
                                </Animated.View>
                                <Text style={[styles.dreamTitle, { position: 'absolute', top: 32, left: 9, fontFamily: 'Outfit-Bold', color: 'rgba(255,255,255,0.9)', }]}>{title}</Text>
                            </View> : <Text style={[styles.dreamTitle, {paddingVertical: 15,  fontFamily: 'Outfit-Bold', color: 'rgba(255,255,255,0.9)', }]}>{" "}{title}</Text>
                        }
                    </View>
                    <View style={styles.bubbleRight}>
                        {loading.description ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.bubbleText}>{description}</Text>
                        )}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Image source={require('../assets/asteriaFace.png')} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                        <View style={styles.bubbleLeft}>
                            {loading.interpretationOrResults ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.bubbleText}>{interpretationOrResults}</Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </GestureHandlerRootView>
        </LinearGradient>
    );
};

export default AsteriaChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: width * 0.05,
        fontFamily: 'Outfit-Medium',
        textAlign: 'center',
        right: 15
    },
    iconAndTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dreamTitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: width * 0.048,
        fontFamily: 'Outfit-Medium',
        textAlign: 'center',
    },
    bubbleLeft: {
        backgroundColor: '#7E57C2',
        padding: 15,
        borderRadius: 15,
        marginLeft: 5,
        maxWidth: '80%',
        alignSelf: 'flex-start',
    },
    bubbleRight: {
        backgroundColor: '#ffffff40',
        padding: 15,
        borderRadius: 15,
        marginTop: 15,
        marginRight: 5,
        maxWidth: '80%',
        alignSelf: 'flex-end',
    },
    bubbleText: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: width * 0.04,
        fontFamily: 'Outfit-Medium',
    },
});

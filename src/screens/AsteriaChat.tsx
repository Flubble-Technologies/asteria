import React, { useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator, Animated, TouchableOpacity, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ArrowLeft, Loop, Underline } from '../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList, AsteriaChatProps } from '../types/navigation';
import { analyzeDreamApi } from '../api/requests/dreams.api';

const { width, height } = Dimensions.get('window');

const AsteriaChat = ({ route }: AsteriaChatProps) => {
    const [error, setError] = useState<string | null>(null);
    const { dream, selectedCategory, timeFrame } = route.params
    const [dreamAnalysis, setDreamAnalysis] = useState<string | null>(null);
    const [analysisData, setAnalysisData] = useState<{ title: string, timeFrame: string, results: string } | null>(null);

    const dynamicIconSize = dream ? dream.title.length * 10.7 : selectedCategory.length * 10.7 //(dream.title || analysisData?.title)?.length * 10.7 || 0;
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [interpretationOrResults, setInterpretationOrResults] = useState('');
    const [seting, setSeting] = useState(false);
    const [loading, setLoading] = useState({
        description: true,
        interpretationOrResults: true
    });

    const slideAnim = useState(new Animated.Value(width))[0];

    useEffect(() => {
        if (dream) {
            return;
        }
        analyzeDreamApi({ timeFrame, selectedCategory }).then((data) => {
            console.log(data);
            setDreamAnalysis(data);
        }).catch((err) => {
            console.log(err);
            setError(err);
        });
    }, [timeFrame, selectedCategory]);

    const typeWriter = (
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        onComplete: () => void,
        speed = 10
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
    useEffect(() => {

        const timeframeMapping: { [key: string]: string } = {
            'weekly': '7-day',
            'monthly': '30-day',
            'yearly': 'yearly',
            'allTime': 'all-time'
        };

        const handleTitle = dream ? dream.title : `${selectedCategory} (${timeframeMapping[timeFrame || '']})` || '';

        if (title.length !== handleTitle.length) {
            typeWriter(handleTitle, setTitle, () => {
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start();

                setLoading((prev) => ({ ...prev, description: false }));

            });
        }

        const handleDescription = dream ? dream.description : `Asteria, can you show me the ${timeframeMapping[timeFrame]} analysis of my ${selectedCategory}?`
        console.log(handleDescription, description);
        console.log(handleDescription.length, description.length);
        if (!seting) {
            setSeting(true);
            typeWriter(handleDescription, setDescription, () => {
                setSeting(false);
                setLoading((prev) => ({ ...prev, interpretationOrResults: false }));
            }, 10);
        }
        const handleInterpretationOrResults = dream?.interpretation || dreamAnalysis || '';
        typeWriter(handleInterpretationOrResults, setInterpretationOrResults, () => { }, 10);

    }, [dream, slideAnim]);

    useEffect(() => {
        if (!dreamAnalysis || dream) {
            return;
        }
        typeWriter(dreamAnalysis, setInterpretationOrResults, () => { }, 10);


    }, [dreamAnalysis]);

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
                    <Text style={[
                        styles.headerText,
                        {
                            marginTop: Platform.OS === 'android' ? 10 : 0,
                        }
                    ]}>Asteria AI</Text>
                    <View />
                </View>
                <View>
                    <Image source={require('../assets/asteria.png')} style={{ width: width * 1, height: height * 0.25, alignSelf: 'center', resizeMode: 'contain' }} />
                    <Image source={require('../assets/cloud2.png')} style={{ width: width * 1, height: height * 0.15, alignSelf: 'center', position: 'absolute', bottom: 0, zIndex: -1 }} />
                </View>
                <ScrollView style={{ marginTop: 15 }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.iconAndTitleContainer}>
                        <Text style={[styles.dreamTitle]}>{dream?.title ? 'Dream interpretation of' : 'Analysis Results for'}</Text>
                        {dream ?
                            <Animated.View style={{ transform: [{ translateX: slideAnim }],marginBottom: 5 }}>
                                <View style={{ marginLeft: 5, position: 'relative',marginTop: 7 }}>
                                    <Text style={[styles.dreamTitle, { fontFamily: 'Outfit-Bold', color: 'rgba(255,255,255,0.9)', }]}>{title}</Text>
                                    <Underline size={dynamicIconSize} color="#7E57C2"/>
                                </View>
                            </Animated.View>
                            :
                            <Text style={[styles.dreamTitle, { paddingVertical: 15, fontFamily: 'Outfit-Bold', color: 'rgba(255,255,255,0.9)', }]}>{" "}{title}</Text>
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
        marginTop: 10,
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

import { StyleSheet, Dimensions, View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Video, { VideoRef } from 'react-native-video';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { storage } from '../utils/mmkvConfig';
import { Star } from '../assets/icons';
import ZoomableImage from '../components/common/ZoomableImage';

const { width, height } = Dimensions.get('window');

const Home = () => {
    const starSize = 6;
    const [animatingStar, setAnimatingStar] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [rate, setRate] = useState(1);
    const videoRef = useRef<VideoRef | null>(null);

    const [stars, setStars] = useState([
        { id: 1, color: "#A8E7A6", initialX: 29.91, initialY: 118.06, date: '03.25.24' },
        { id: 2, color: "#FFA666", initialX: 265.08, initialY: 89.39, date: '08.02.24' },
        { id: 3, color: "white", initialX: 137.83, initialY: 76.46, date: '12.12.24' },
        { id: 4, color: "#FFA666", initialX: 82.58, initialY: 205.86, date: '01.01.25' },
        { id: 5, color: "#84D8FA", initialX: 205.41, initialY: 158.53, date: '02.14.25' },
    ]);

    useEffect(() => {
        const loadedStars = stars.map(star => {
            const savedPosition = storage.getString(`star_${star.id}`);
            if (savedPosition) {
                const { x, y } = JSON.parse(savedPosition);
                return { ...star, initialX: x, initialY: y };
            }
            return star;
        });
        setStars(loadedStars);
    }, []);
    const handleStarPress = (index: any) => {
        setAnimatingStar(index);
        setRate(3);
    };
    const handleAnimationComplete = () => {
        if (animatingStar !== null) {
            setRate(1);
            setModalVisible(true);
            setAnimatingStar(null);
        }
    };
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setRate(1);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1, zIndex: 99 }}>
            <LinearGradient
                colors={['#000000', '#0C0C0C', '#121212']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}
            >
                {/*  <Video
                    source={require('../assets/sky.mp4')}
                    style={styles.backgroundVideo}
                    resizeMode="cover"
                    repeat
                    paused={isModalVisible}
                    ref={videoRef}
                    rate={rate}
                    onEnd={() => {
                        if (videoRef.current && !isModalVisible) {
                            videoRef.current.seek(0);
                        }
                    }}
                /> */}
                {stars.map((star) => (
                    <Star
                        key={star.id}
                        id={star.id}
                        size={starSize}
                        color={star.color}
                        date={star.date}
                        onPress={() => handleStarPress(star.id)}
                        isAnimating={animatingStar === star.id}
                        initialX={star.initialX}
                        initialY={star.initialY}
                        onAnimComplete={handleAnimationComplete}
                    />
                ))}
                <View style={{ width: '90%', height: 58, aspectRatio: 1, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: '#1F1F1F', position: 'absolute', borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.09)', }} />
                <Image source={require('../assets/showingStars.png')} style={{ width: 230, height: 265, resizeMode: 'contain' }} />
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={toggleModal}
                    animationIn="wobble"
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={styles.modalContent}>
                        <PagerView
                            style={styles.pagerView}
                            orientation='horizontal'
                            transitionStyle='curl'
                            initialPage={0}
                            showPageIndicator={true}
                            scrollEnabled={true}>
                            <View key="1">
                                <ZoomableImage imageUrl={require('../assets/cartoons/cartoon3.png')} />
                            </View>
                            <View key="2">
                                <ZoomableImage imageUrl={require('../assets/cartoons/cartoon4.png')} />
                            </View>
                            <View key="3">
                                <ZoomableImage imageUrl={require('../assets/cartoons/cartoon5.png')} />
                            </View>
                            <View key="4">
                                <ZoomableImage imageUrl={require('../assets/cartoons/cartoon6.png')} />
                            </View>
                        </PagerView>
                    </View>
                </Modal>
            </LinearGradient>
        </GestureHandlerRootView>
    );
};

export default Home;

const styles = StyleSheet.create({
    pagerView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    backgroundVideo: {
        ...StyleSheet.absoluteFillObject,
    },
    svgContainer: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    modalContent: {
        width: width,
        height: height * 0.55,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Outfit-Regular'
    },
});

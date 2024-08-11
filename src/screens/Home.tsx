// Home.tsx
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { storage } from '../utils/mmkvConfig';
import Star from '../components/common/star';
import VideoBackground from '../components/Home/VideBackground';
import DreamModal from '../components/common/DreamModal';

const dreamMockData = [
	{
		id: 1,
		color: "#A8E7A6",
		initialX: 29.91,
		initialY: 118.06,
		date: '03.25.24',
		dreamTitle: 'Flying Whale',
		dreamDescription: 'I saw a giant whale flying over an ocean. As the whale rose towards the sky, it disappeared among colorful clouds.',
		interpretation: 'The dream suggests that you are feeling free and independent. You are ready to explore new possibilities and take risks.',
		type: "Lucid"
	},
	{
		id: 2,
		color: "#FFA666",
		initialX: 265.08,
		initialY: 89.39,
		date: '08.02.24',
		dreamTitle: 'Lost City',
		dreamDescription: 'I was wandering through a ruined city. Among the abandoned buildings, I saw old friends, but they couldnt call out to me.',
		interpretation: 'The dream may indicate that you are feeling disconnected from your past. You may be longing for the comfort of familiar faces.',
		type: "Nightmare"
	},
	{
		id: 3,
		color: "white",
		initialX: 137.83,
		initialY: 76.46,
		date: '01.12.24',
		dreamTitle: "Cats' Party",
		dreamDescription: "I attended a party full of cats in a park. Each cat was wearing a costume, and they were all dancing.",
		interpretation: "The dream may suggest that you are feeling playful and carefree. You are enjoying the company of others and embracing your inner child.",
		type: "Dream"
	},
	{
		id: 4,
		color: "#FFA666",
		initialX: 82.58,
		initialY: 205.86,
		date: '06.10.24',
		dreamTitle: "Floating Island",
		dreamDescription: "A magnificent island was slowly moving over the sea. The island had a forest full of colorful flowers.",
		interpretation: "The dream may indicate that you are feeling disconnected from reality. You may be seeking a sense of stability and security.",
		type: "Lucid"
	},
	{
		id: 5,
		color: "#84D8FA",
		initialX: 205.41,
		initialY: 158.53,
		date: '08.11.24',
		dreamTitle: "Endless Staircase",
		dreamDescription: "I was climbing a seemingly endless staircase. Each step revealed a different view.",
		interpretation: "The dream may suggest that you are facing challenges in your life. You are determined to overcome obstacles and reach new heights.",
		type: "Dream"
	},
	{
		id: 6,
		color: "#FFA666",
		initialX: 145.58,
		initialY: 265.86,
		date: '07.14.24',
		dreamTitle: "Talking Trees",
		dreamDescription: "I walked through a forest where trees could talk. Each tree had a different story to tell.",
		interpretation: "The dream may indicate that you are seeking wisdom and guidance. You are open to new ideas and perspectives.",
		type: "Dream"
	},
	{
		id: 7,
		color: "#84D8FA",
		initialX: 255.41,
		initialY: 208.53,
		date: '09.21.24',
		dreamTitle: "Time Travel",
		dreamDescription: "I traveled back in time and visited ancient civilizations. It was fascinating to see history unfold.",
		interpretation: "The dream may suggest that you are reflecting on your past. You are exploring your roots and seeking a deeper understanding of yourself.",
		type: "Lucid"
	},
];



const Home = () => {
    const starSize = 6;
    const [animatingStar, setAnimatingStar] = useState<number | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [rate, setRate] = useState(1);
    const [selectedStar, setSelectedStar] = useState(dreamMockData[0]);

    const [stars, setStars] = useState(dreamMockData);

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

    const handleStarPress = (id: number) => {
        setAnimatingStar(id);
        setRate(3);
        const selected = stars.find(star => star.id === id);
        if (selected) {
            setSelectedStar(selected);
        }
    };
    const handleAnimationComplete = () => {
        if (animatingStar !== null) {
            setRate(1);
            setModalVisible(true);
            setAnimatingStar(null);
        }
    };

    storage.clearAll()

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
                {/* <VideoBackground source={require('../assets/sky.mp4')} paused={isModalVisible} rate={rate} /> */}
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
                <DreamModal isVisible={isModalVisible} toggleModal={toggleModal} selectedStar={selectedStar} />
            </LinearGradient>
        </GestureHandlerRootView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});

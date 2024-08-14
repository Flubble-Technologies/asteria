import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Star } from '../assets/icons';
import DreamModal from '../components/common/DreamModal';
import MyShowMessage from '../components/common/MyShowMessage';
import { DreamImageStatus } from '../constants/dream-image-status';
import { useDreams } from '../context/dream/dream-provider.';
import { IDream } from '../types/IDream';
import { UUID } from '../..';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const Home = () => {
	const { dreams } = useDreams(); // Use context to access dreams
	const starSize = 6;
	const [rate, setRate] = useState(1);
	const [imagePending, setImagePending] = useState(false);
	const videoRef = useRef<any>(null);
	const [isModalVisible, setModalVisible] = useState(false);
	const [selectedDream, setSelectedDream] = useState<IDream | null>(null);
	const [animatingStar, setAnimatingStar] = useState<UUID | null>(null);

	const getRandomColor = () => {
		const colors = ['#FFA666', '#A8E7A6', '#84D8FA', '#FFA666', 'white', '#8EDCFC', '#F5F5F5'];
		const randomIndex = Math.floor(Math.random() * colors.length);

		return colors[randomIndex];
	}

	const handleStarPress = async (dream: IDream) => {
		if (dream.imageStatus !== DreamImageStatus.done) {
			MyShowMessage({
				message: 'Dream is not ready yet',
				type: 'warning',
				description: 'Please wait for the dream to be ready',
				duration: 3000,
			});
			return;
		}
		setImagePending(true);
		setSelectedDream(dream);
		setAnimatingStar(dream.id);
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
				style={styles.container}>
				<Video
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
				/>
				{dreams.map(star => (
					<Star
						key={star.id}
						id={star.id}
						size={starSize}
						color={getRandomColor()}
						date={star.date}
						onPress={() => handleStarPress(star)}
						isAnimating={animatingStar === star.id}
						initialX={star.initialX}
						initialY={star.initialY}
						onAnimComplete={handleAnimationComplete}
					/>
				))}
				<View
					style={{
						width: '90%',
						height: 58,
						aspectRatio: 1,
						borderTopRightRadius: 10,
						borderTopLeftRadius: 10,
						backgroundColor: '#1F1F1F',
						position: 'absolute',
						borderBottomWidth: 1,
						borderColor: 'rgba(255,255,255,0.09)',
					}}
				/>
				<Image
					source={require('../assets/showingStars.png')}
					style={{ width: 230, height: 265, resizeMode: 'contain' }}
				/>
				<DreamModal isVisible={isModalVisible} toggleModal={toggleModal} selectedStar={selectedDream} />
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
	},
	backgroundVideo: {
		...StyleSheet.absoluteFillObject,
	},
});

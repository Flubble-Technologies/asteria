import {
	StyleSheet,
	Dimensions,
	View,
	Image,
} from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { Star } from '../assets/icons';
import ZoomableImage from '../components/common/ZoomableImage';
import { IDream } from '../types/IDream';
import { getDreamsApi, startImageCreationApi } from '../api/requests/dreams.api';
import { DreamImageStatus } from '../constants/dream-image-status';
import { useFocusEffect } from '@react-navigation/native';
import Video, { VideoRef } from 'react-native-video';
import DreamModal from '../components/common/DreamModal';

const { width, height } = Dimensions.get('window');

const Home = () => {
	const starSize = 6;
	const [rate, setRate] = useState(1);
	const [dreams, setDreams] = useState<IDream[]>([]);
	const [imagePending, setImagePending] = useState(false);
	const videoRef = useRef<VideoRef>(null);
	const [isModalVisible, setModalVisible] = useState(false);
	const [selectedDream, setSelectedDream] = useState<IDream | null>(null);
	const [animatingStar, setAnimatingStar] = useState<string | null>(null);

	const getRandomColor = () => {
		const colors = ['#FFA666', '#A8E7A6', '#84D8FA', '#FFA666', 'white', '#8EDCFC', '#F5F5F5'];
		const randomIndex = Math.floor(Math.random() * colors.length);

		return colors[randomIndex];
	}


	useFocusEffect(
		useCallback(() => {
			getDreamsApi().then((response) => {
				setDreams(response);
			});
		}, [])
	);

	const handleStarPress = async (dream: IDream) => {
		console.log('dream', dream.imageStatus);
		/* if (selectedDream?.imageStatus === DreamImageStatus.done) {
			setImagePending(false);
		} else if (selectedDream?.imageStatus === DreamImageStatus.waiting) {
			await startImageCreationApi(dream.id);
			return;
		} */
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
				{/*<Video
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
					/>*/}
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
{/* 				<Modal
					isVisible={isModalVisible}
					onBackdropPress={toggleModal}
					animationIn="wobble"
					style={{ justifyContent: 'center', alignItems: 'center' }}>
					<View style={styles.modalContent}>
						<PagerView
							style={styles.pagerView}
							orientation="horizontal"
							transitionStyle="curl"
							initialPage={0}
							showPageIndicator={true}
							scrollEnabled={true}>
							{selectedDream?.images.map((image, index) => (
								<View key={index}>
									<ZoomableImage imageUrl={`http://192.168.1.107:9000/${image.image}`} />
								</View>
							))}
						</PagerView>
					</View>
				</Modal> */}
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
	pagerView: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
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
		fontFamily: 'Outfit-Regular',
	},
});

import LottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import { Tick } from '../../assets/icons';

const { width } = Dimensions.get('window');

interface DreamProcessingModalProps {
	isVisible: boolean;
	onClose: () => void;
}

const DreamProcessingModal = ({ isVisible, onClose }: DreamProcessingModalProps) => {
	const [currentPhase, setCurrentPhase] = useState('interpreting');
	const [progress, setProgress] = useState(0);
	const [canProceed, setCanProceed] = useState(false);

	useEffect(() => {
		if (currentPhase === 'interpreting') {
			const interval = setInterval(() => {
				setProgress((prevProgress) => {
					if (prevProgress < 4) {
						return prevProgress + 1;
					} else {
						clearInterval(interval);
						setCanProceed(true);
						return prevProgress;
					}
				});
			}, 1000);
		} else if (currentPhase === 'cartoonizing') {
			const interval = setInterval(() => {
				setProgress((prevProgress) => {
					if (prevProgress < 4) {
						return prevProgress + 1;
					} else {
						clearInterval(interval);
						return prevProgress;
					}
				});
			}, 1000);
		}
	}, [currentPhase]);

	const handleStartCartoonizing = () => {
		setCurrentPhase('cartoonizing');
		setProgress(0); // Reset progress for cartoonizing phase
		setCanProceed(false); // Reset canProceed for next phase
	};

	const renderPageIndicator = () => {
		const steps = ['interpreting', 'cartoonizing'];
		return (
			<View style={styles.pageIndicatorContainer}>
				{steps.map((step, index) => (
					<View
						key={index}
						style={[
							styles.pageIndicator,
							{ opacity: currentPhase === step ? 1 : 0.5 }
						]}
					/>
				))}
			</View>
		);
	};

	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onClose}
			swipeDirection="down"
			style={styles.modalStyle}
		>
			<View style={styles.modalContent}>
				<View style={styles.swipeIndicator} />
				{currentPhase === 'interpreting' ? (
					<View style={styles.phaseContainer}>
						<Text style={styles.phaseText}>Your dream is being interpreted...</Text>
						<LottieView source={require('../../assets/interpretingLottie.json')} autoPlay loop={true} style={{ padding: 110 }} />
						{renderPageIndicator()}

						<TouchableOpacity
							style={[styles.nextButton, { opacity: canProceed ? 1 : 0.5 }]}
							onPress={handleStartCartoonizing}
							disabled={!canProceed}
						>
							<Text style={styles.nextButtonText}>{canProceed ? 'Next' : 'Processing...'}</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.phaseContainer}>
						<View style={styles.completedContainer}>
							<Text style={styles.completedText}>Dream interpretation completed</Text>
							<Tick size={width * 0.055} color='#fff' />
						</View>
						{
							progress === 4 ?
								<>
									<View style={styles.completedContainer}>
										<Text style={styles.completedText}>Dream cartoonization completed</Text>
										<Tick size={width * 0.055} color='#fff' />
									</View>
									<TouchableOpacity
										style={[styles.closeButton, { opacity: progress >= 4 ? 1 : 0.5 }]}
										onPress={onClose}
										disabled={progress < 4}
									>
										<Text style={styles.closeButtonText}>
											{progress < 4 ? 'Processing...' : 'Close'}
										</Text>
									</TouchableOpacity>
								</>
								: (
									<>
										<Text style={styles.phaseText}>Now your dream is being cartoonized...</Text>
										<LottieView source={require('../../assets/drawingLottie3.json')} autoPlay loop={true} style={{ padding: 110 }} />
										{renderPageIndicator()}
										<Text style={styles.progressText}>{progress}/4 images completed</Text>
										<View style={styles.progressBarContainer}>
											<View style={[styles.progressBar, { width: `${(progress / 4) * 100}%` }]} />
										</View>
									</>
								)
						}
					</View>
				)}

				<SafeAreaView />
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalStyle: {
		margin: 0,
		justifyContent: 'flex-end',
	},
	modalContent: {
		backgroundColor: '#1F1F1F',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
	},
	swipeIndicator: {
		alignSelf: 'center',
		width: 40,
		height: 7,
		borderRadius: 50,
		backgroundColor: '#585757',
		marginBottom: 20,
	},
	phaseContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	pageIndicatorContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 10,
	},
	pageIndicator: {
		width: 10,
		height: 10,
		backgroundColor: '#7E57C2',
		borderRadius: 5,
		marginHorizontal: 5,
	},
	phaseText: {
		color: '#fff',
		fontSize: width * 0.045,
		fontFamily: 'Outfit-Medium',
		marginBottom: 10,
	},
	completedContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.3)',
		backgroundColor: '#7E57C2',
		borderRadius: 10,
		padding: 12,
		paddingHorizontal: 25,
	},
	completedText: {
		color: '#fff',
		fontSize: width * 0.045,
		fontFamily: 'Outfit-Medium',
		marginRight: 10,
	},
	progressText: {
		color: '#fff',
		fontSize: width * 0.04,
		marginBottom: 10,
	},
	progressBarContainer: {
		width: '80%',
		height: 10,
		backgroundColor: '#fff',
		borderRadius: 5,
		overflow: 'hidden',
		marginVertical: 10,
	},
	progressBar: {
		height: '100%',
		backgroundColor: '#7E57C2',
	},
	nextButton: {
		backgroundColor: '#7E57C2',
		padding: 15,
		borderRadius: 30,
		marginTop: 25,
		width: '60%',
		alignItems: 'center',
	},
	nextButtonText: {
		color: '#fff',
		fontSize: width * 0.045,
		fontFamily: 'Outfit-Medium',
	},
	closeButton: {
		backgroundColor: '#7E57C2',
		padding: 15,
		borderRadius: 30,
		marginTop: 10,
		width: '45%',
		alignItems: 'center',
	},
	closeButtonText: {
		color: '#fff',
		fontSize: width * 0.045,
		fontFamily: 'Outfit-Medium',
	},
	disabledButtonText: {
		opacity: 0.5,
	},
});

export default DreamProcessingModal;

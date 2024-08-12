import { StyleSheet, Text, TouchableOpacity, Dimensions, PanResponder, Animated as Animated2, Platform, ViewStyle } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withSequence, runOnJS, cancelAnimation } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import Circle from '../../assets/icons/circle';
import { updateDreamPositionApi } from '../../api/requests/dreams.api';

const { width, height } = Dimensions.get('window');

interface StarProps {
	id: string;
	size: number;
	color: string;
	date: Date | string;
	style?: ViewStyle;
	onPress?: () => void;
	isAnimating: boolean;
	initialX: number;
	initialY: number;
	onAnimComplete: () => void;
}

const Star = (props: StarProps) => {
	const { id, size, color, date, onPress, isAnimating, initialX, initialY, onAnimComplete } = props;
	const [position, setPosition] = useState({ x: initialX, y: initialY });

	const pan = useRef(new Animated2.ValueXY(position)).current;
	useEffect(() => {
		pan.setValue({ x: position.x, y: position.y });
	}, [position]);

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				pan.setOffset({ x: pan.x._value, y: pan.y._value });
				pan.setValue({ x: 0, y: 0 });
			},
			onPanResponderMove: Animated2.event(
				[null, { dx: pan.x, dy: pan.y }],
				{ useNativeDriver: false }
			),
			onPanResponderRelease: async () => {
				pan.flattenOffset();
				const newPosition = {
					x: pan.x._value,
					y: pan.y._value
				};
				setPosition(newPosition);
				await updateDreamPositionApi(id, {
					initialX: newPosition.x,
					initialY: newPosition.y,
				}).then(() => {
					console.log('position updated');
				});
			},
		})
	).current;

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const scale = useSharedValue(1);

	useEffect(() => {
		if (isAnimating) {
			translateX.value = withSequence(
				withTiming((width / 2 - initialX) / scale.value, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
				withTiming(0, { duration: 100, easing: Easing.inOut(Easing.ease) })
			);
			translateY.value = withSequence(
				withTiming((height / 2 - initialY) / scale.value, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
				withTiming(0, { duration: 100, easing: Easing.inOut(Easing.ease) })
			);
			scale.value = withSequence(
				withTiming(500, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
				withTiming(1, { duration: 500 }, () => {
					runOnJS(onAnimComplete)();
				}),
				withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) })
			);
		} else {
			cancelAnimation(translateX);
			cancelAnimation(translateY);
			cancelAnimation(scale);
			translateX.value = withTiming(0, { duration: 700, easing: Easing.inOut(Easing.ease) });
			translateY.value = withTiming(0, { duration: 700, easing: Easing.inOut(Easing.ease) });
			scale.value = withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) });
		}
	}, [isAnimating]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
				{ scale: scale.value }
			],
		};
	});

	const handleStarPress = () => {
		if (onPress) onPress();
	};

	return (
		<Animated2.View
			style={[
				{
					zIndex: 99,
					position: 'absolute',
					left: 0,
					top: 0,
					transform: [
						{ translateX: pan.x },
						{ translateY: pan.y }
					]
				}
			]}
			{...panResponder.panHandlers}
		>
			<TouchableOpacity onPress={handleStarPress} style={styles.star}>
				<Animated.View style={animatedStyle}>
					<Circle size={size} color={color} />
				</Animated.View>
				{
					Platform.OS === 'ios' ? (
						<BlurView style={styles.blurContainer} blurAmount={1}>
							<Text style={styles.dateText}>{date}</Text>
						</BlurView>) : (
						<Text style={styles.dateText}>{date}</Text>)
				}
			</TouchableOpacity>
		</Animated2.View>
	);
};

export default Star;

const styles = StyleSheet.create({
	starContainer: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	star: {
		alignItems: 'center',
		gap: 2,
	},
	blurContainer: {
		paddingHorizontal: 11,
		paddingVertical: 6,
		borderRadius: 10,
	},
	dateText: {
		color: '#fff',
		fontFamily: 'Outfit-Regular',
		fontSize: width * 0.030,
	},
});

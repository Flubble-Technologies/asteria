import React, { useEffect } from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDecay,
    withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

type PinchOptions = {
    toScale: number;
    fromScale: number;
    origin: { x: number; y: number };
    delta: { x: number; y: number };
    offset: { x: number; y: number };
};

const pinchTransform = ({
    toScale,
    fromScale,
    delta,
    origin,
    offset,
}: PinchOptions) => {
    'worklet';

    const fromPinchX = -1 * (origin.x * fromScale - origin.x);
    const fromPinchY = -1 * (origin.y * fromScale - origin.y);
    const toPinchX = -1 * (origin.x * toScale - origin.x);
    const toPinchY = -1 * (origin.y * toScale - origin.y);

    const x = offset.x + toPinchX - fromPinchX + delta.x;
    const y = offset.y + toPinchY - fromPinchY + delta.y;
    return { x, y };
};

const clamp = (lowerBound: number, upperBound: number, value: number) => {
    'worklet';
    return Math.max(lowerBound, Math.min(value, upperBound));
};

const friction = (fraction: number) => {
    'worklet';
    return 0.75 * Math.pow(1 - fraction * fraction, 2);
};

const config = { duration: 200, easing: Easing.linear };

interface ZoomableImageProps {
    imageUrl: any;
}

const ZoomableImage = ({ imageUrl }: ZoomableImageProps) => {
    const { width, height } = useWindowDimensions();
    const imageWidth = useSharedValue<number>(0);
    const imageHeight = useSharedValue<number>(0);

    const scale = useSharedValue<number>(1);
    const scaleOffset = useSharedValue<number>(1);

    const translateX = useSharedValue<number>(0);
    const translateY = useSharedValue<number>(0);
    const translateXOffset = useSharedValue<number>(0);
    const translateYOffset = useSharedValue<number>(0);

    const originX = useSharedValue<number>(0);
    const originY = useSharedValue<number>(0);

    const boundaries = useDerivedValue(() => {
        const offsetX = Math.max(0, imageWidth.value * scale.value - width) / 2;
        const offsetY = Math.max(0, imageHeight.value * scale.value - height) / 2;

        return { x: offsetX, y: offsetY };
    }, [scale, imageWidth, imageHeight, width, height]);

    const isPinchActive = useSharedValue<boolean>(false);
    const pinch = Gesture.Pinch()
        .onStart(e => {
            isPinchActive.value = true;
            originX.value = e.focalX - imageWidth.value / 2;
            originY.value = e.focalY - imageHeight.value / 2;

            translateXOffset.value = translateX.value;
            translateYOffset.value = translateY.value;
            scaleOffset.value = scale.value;
        })
        .onUpdate(e => {
            const toScale = e.scale * scaleOffset.value;
            const deltaX = e.focalX - imageWidth.value / 2 - originX.value;
            const deltaY = e.focalY - imageHeight.value / 2 - originY.value;

            const { x: toX, y: toY } = pinchTransform({
                toScale: toScale,
                fromScale: scaleOffset.value,
                origin: { x: originX.value, y: originY.value },
                offset: { x: translateXOffset.value, y: translateYOffset.value },
                delta: { x: deltaX, y: deltaY },
            });

            const boundX = Math.max(0, imageWidth.value * toScale - width) / 2;
            const boundY = Math.max(0, imageHeight.value * toScale - height) / 2;

            translateX.value = clamp(-1 * boundX, boundX, toX);
            translateY.value = clamp(-1 * boundY, boundY, toY);
            scale.value = toScale;
        })
        .onEnd(() => {
            isPinchActive.value = false;

            if (scale.value < 1) {
                scale.value = withTiming(1);
                translateX.value = withTiming(0);
                translateY.value = withTiming(0);
            }
        });

    const isWithinBoundX = useSharedValue<boolean>(true);
    const isWithinBoundY = useSharedValue<boolean>(true);
    const pan = Gesture.Pan()
        .enabled(isPinchActive.value) // Sadece yakınlaştırma sırasında aktif olsun
        .maxPointers(1)
        .onStart(_ => {
            cancelAnimation(translateX);
            cancelAnimation(translateY);

            translateXOffset.value = translateX.value;
            translateYOffset.value = translateY.value;
        })
        .onChange(({ translationX, translationY, changeX, changeY }) => {
            const toX = translateXOffset.value + translationX;
            const toY = translateYOffset.value + translationY;

            const { x: boundX, y: boundY } = boundaries.value;
            isWithinBoundX.value = toX >= -1 * boundX && toX <= boundX;
            isWithinBoundY.value = toY >= -1 * boundY && toY <= boundY;

            if (isWithinBoundX.value) {
                translateX.value = clamp(-1 * boundX, boundX, toX);
            } else {
                if (imageWidth.value * scale.value < width) {
                    translateX.value = clamp(-1 * boundX, boundX, toX);
                } else {
                    const fraction = (Math.abs(toX) - boundX) / width;
                    const frictionX = friction(clamp(0, 1, fraction));
                    translateX.value += changeX * frictionX;
                }
            }

            if (isWithinBoundY.value) {
                translateY.value = clamp(-1 * boundY, boundY, toY);
            } else {
                if (imageHeight.value * scale.value < height) {
                    translateY.value = clamp(-1 * boundY, boundY, toY);
                } else {
                    const fraction = (Math.abs(toY) - boundY) / width;
                    const frictionY = friction(clamp(0, 1, fraction));
                    translateY.value += changeY * frictionY;
                }
            }
        })
        .onEnd(({ velocityX, velocityY }) => {
            const { x: boundX, y: boundY } = boundaries.value;
            const toX = clamp(-1 * boundX, boundX, translateX.value);
            const toY = clamp(-1 * boundY, boundY, translateY.value);

            translateX.value = isWithinBoundX.value
                ? withDecay({ velocity: velocityX / 2, clamp: [-1 * boundX, boundX] })
                : withTiming(toX, config);

            translateY.value = isWithinBoundY.value
                ? withDecay({ velocity: velocityY / 2, clamp: [-1 * boundY, boundY] })
                : withTiming(toY, config);
        });

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .maxDuration(250)
        .onStart(_ => {
            translateXOffset.value = translateX.value;
            translateYOffset.value = translateY.value;
        })
        .onEnd(e => {
            if (isPinchActive.value) {
                return;
            }

            if (scale.value > 2) {
                translateX.value = withTiming(0);
                translateY.value = withTiming(0);
                scale.value = withTiming(1);
                return;
            }

            const orgnX = e.x - imageWidth.value / 2;
            const orgnY = e.y - imageHeight.value / 2;
            const highestScreenDimension = Math.max(width, height);
            const higheststImageDimension = Math.max(
                imageWidth.value,
                imageHeight.value,
            );

            const tapOrigin = width > height ? orgnX : orgnY;
            const toScale =
                ((highestScreenDimension + Math.abs(tapOrigin)) /
                    higheststImageDimension) *
                2;

            const { x, y } = pinchTransform({
                fromScale: scale.value,
                toScale,
                origin: { x: orgnX, y: orgnY },
                offset: { x: translateXOffset.value, y: translateYOffset.value },
                delta: { x: 0, y: 0 },
            });

            const boundX = Math.max(0, (imageWidth.value * toScale - width) / 2);
            const boundY = Math.max(0, (imageHeight.value * toScale - height) / 2);

            translateX.value = withTiming(clamp(-boundX, boundX, x));
            translateY.value = withTiming(clamp(-boundY, boundY, y));
            scale.value = withTiming(toScale);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        width: imageWidth.value,
        height: imageHeight.value,
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    useEffect(() => {
        const source = typeof imageUrl === 'number' ? Image.resolveAssetSource(imageUrl).uri : imageUrl;

        Image.getSize(
            source,
            (w, h) => {
                const isPortrait = width < height;
                const aspectRatio = w / h;

                if (isPortrait) {
                    imageWidth.value = width;
                    imageHeight.value = width / aspectRatio;
                } else {
                    imageWidth.value = height * aspectRatio;
                    imageHeight.value = height;
                }

                // İlk başta ve her resim değişiminde değerleri sıfırla
                scale.value = withTiming(1, config);
                translateX.value = withTiming(0, config);
                translateY.value = withTiming(0, config);
            },
            e => console.log(e),
        );
    }, [width, height, imageUrl]);

    return (
        <View style={styles.root}>
            <GestureDetector gesture={Gesture.Simultaneous(pinch, pan, doubleTap)}>
                <Animated.Image
                    style={animatedStyle}
                    source={typeof imageUrl === 'number' ? { uri: Image.resolveAssetSource(imageUrl).uri } : { uri: imageUrl }}
                    resizeMethod={'scale'}
                />
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
});

export default ZoomableImage;

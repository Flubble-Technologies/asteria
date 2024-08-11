// VideoBackground.tsx
import React, { useRef } from 'react';
import Video, { VideoRef } from 'react-native-video';
import { StyleSheet } from 'react-native';

interface VideoBackgroundProps {
    source: any;
    paused?: boolean;
    rate?: number;
}

const VideoBackground = ({ source, paused, rate }:VideoBackgroundProps) => {
    const videoRef = useRef<VideoRef | null>(null);

    return (
        <Video
            source={source}
            style={styles.backgroundVideo}
            resizeMode="cover"
            repeat
            paused={paused}
            ref={videoRef}
            rate={rate}
            onEnd={() => {
                if (videoRef.current && !paused) {
                    videoRef.current.seek(0);
                }
            }}
        />
    );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default VideoBackground;

// TruncatableText.tsx
import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface TruncatableTextProps {
    text: string;
    limit: number;
}

const { width } = Dimensions.get('window');

const TruncatableText = ({ text, limit }: TruncatableTextProps) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    if (text.length <= limit) {
        return <Text style={styles.text}>{text}</Text>;
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={toggleShowFullText}>
            <Text style={styles.text}>
                {showFullText ? `${text}` : `${text.substring(0, limit)}`}
                <Text style={styles.moreText}>{showFullText ? ' Read Less' : ' ...Read more'}</Text>
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        marginTop: 7,
        fontSize: width * 0.04,
        color: 'rgba(255,255,255,0.9)',
        fontFamily: 'Bangers-Regular',
    },
    moreText: {
        fontSize: width * 0.04,
        color: '#3498db',
    },
});

export default TruncatableText;

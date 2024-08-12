import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import OnboardItem from '../components/Onboarding/OnboardItem';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const colors = { primary: '#fff' };

const slides = [
    {
        id: '1',
        image: require('../assets/flying.png'),
        title: (
            <Text>
                Dreams reflect the
                <Text style={{ color: '#7E57C2', fontFamily: 'Outfit-Bold', fontSize: width * 0.075 }}> subconscious</Text>
            </Text>
        ),
    },
    {
        id: '2',
        image: require('../assets/showingstars3.png'),
        title: (
            <Text>
                Keep your dreams among the
                <Text style={{ color: '#7E57C2', fontFamily: 'Outfit-Bold', fontSize: width * 0.075 }}> stars </Text>
                and in your
                <Text style={{ color: '#7E57C2', fontFamily: 'Outfit-Bold', fontSize: width * 0.075 }}>
                    {' '}diary
                </Text>
            </Text>
        ),
    },
    {
        id: '3',
        image: require('../assets/drawing.png'),
        title: (
            <Text>
                <Text style={{ color: '#7E57C2', fontFamily: 'Outfit-Bold', fontSize: width * 0.075 }}>
                    Cartoonize
                </Text>
                {' '}your dreams
            </Text>
        ),
    },
    {
        id: '4',
        image: require('../assets/interpretation.png'),
        title: (
            <Text>
                Discover the
                <Text style={{ color: '#7E57C2', fontFamily: 'Outfit-Bold', fontSize: width * 0.075 }}> interpretations </Text>
                of your dreams
            </Text>
        ),
    },
    {
        id: '5',
        image: require('../assets/analysis2.png'),
        title: (
            <Text>
                <Text style={{ color: '#7E57C2', fontFamily: 'Outfit-Bold', fontSize: width * 0.075 }}>Analyze </Text>
                your dreams by topic
            </Text>
        ),
    },
    
];

export default function OnboardingScreen({ navigation }: any) {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef<FlatList>(null);

    const updateCurrentSlideIndex = (e: any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
            setCurrentSlideIndex(nextSlideIndex);

            if (ref.current) {
                ref.current.scrollToOffset({ offset: nextSlideIndex * width, animated: true });
            }
        }, 2000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [currentSlideIndex]);

    return (
        <View style={styles.outerContainer}>
            <LinearGradient
                colors={['#000000', '#0C0C0C', '#121212']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1 }}>
                <View style={styles.body}>
                    <FlatList
                        ref={ref}
                        onMomentumScrollEnd={updateCurrentSlideIndex}
                        pagingEnabled
                        keyExtractor={item => item.id.toString()}
                        data={slides}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <OnboardItem item={item} />}
                    />
                </View>
                <View style={styles.indicatorContainer}>
                    {slides.map((_, index) => (
                        <View key={index} style={[styles.indicator, currentSlideIndex == index && styles.selectedIndicator]} />
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => navigation.navigate('SignIn')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.signInButtonText}>Get Started</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpText}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    body: {
        width,
        height: height * 0.73,
    },
    renderItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '2%'
    },
    title: {
        fontFamily: 'Outfit-Bold',
        fontSize: width * 0.075,
        textAlign: 'center',
        color: '#1A305A',
        maxWidth: '80%',
        marginTop: 7,
    },
    subtitle: {
        color: '#797979',
        fontFamily: 'Outfit-Light',
        fontSize: width * 0.042,
        marginTop: 10,
        width,
        paddingHorizontal: 50,
        textAlign: 'center',
    },
    indicator: {
        height: 4,
        width: 14,
        backgroundColor: '#5A5A5A',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    selectedIndicator: {
        backgroundColor: '#DADADA',
        width: 20,
        height: 6,
        borderRadius: 50,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    footerText: {
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'Outfit-Regular',
    },
    signUpText: {
        color: '#7E57C2',
        fontFamily: 'Outfit-Bold',
    },
    signInButton: {
        backgroundColor: '#7E57C2',
        padding: 15,
        borderRadius: 10,
        marginTop: 50,
        alignItems: 'center',
        marginHorizontal: 27,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: width * 0.047,
        fontFamily: 'Outfit-SemiBold',
    },
});

import React, { useCallback } from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DreamAnalysisCategories } from '../../constants/dream-analysis-categories';
import { TimeFrame } from '../../constants/time-frame';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../types/navigation';
import { getDreamsApi } from '../../api/requests/dreams.api';
import MyShowMessage from '../common/MyShowMessage';

const { width, height } = Dimensions.get('window');

interface AnalysisProps {
    selectedTimeFrame: string;
}

const mockData = [
    {
        id: 1,
        title: DreamAnalysisCategories.EmotionalStateAnalysis,//'Emotional State Analysis',
        subtitle: 'Understanding your emotional fluctuations',
        image: require('../../assets/analysis/emotional/emotional4.png'),
        colors: ['#F67945', '#F78353', '#F89C75']
    },
    {
        id: 2,
        title: DreamAnalysisCategories.PsychologicalSituationAndThemes,//"Psychological State Analysis",
        subtitle: "Insights into your mental health",
        image: require('../../assets/analysis/psychological/psychological1.png'),
        colors: ["#76B852", "#80BF5F", "#90C872"]
    },
    {
        id: 3,
        title: DreamAnalysisCategories.StressAndAnxietyLevels,//'Stress and Anxiety Analysis',
        subtitle: 'Evaluating stress and anxiety levels',
        image: require('../../assets/analysis/stressAndAnxiety/stressAndAnxiety2.png'),
        colors: ['#7E57C2', '#8D6CC6', '#997DCA']

    },
    {
        id: 4,
        title: DreamAnalysisCategories.RelationshipBetweenSleepQualityAndDreams,//'Sleep Quality and Dream Relationship',
        subtitle: 'Linking sleep patterns to dream quality',
        image: require('../../assets/analysis/sleepQuality/sleepQuality2.png'),
        colors: ['#4A90E2', '#599BE7', '#81B7F5']
    },
    {
        id: 5,
        title: DreamAnalysisCategories.SubconsciousNeedsAndGoals,//'Subconscious Needs and Goals',
        subtitle: 'Exploring your hidden desires and objectives.',
        image: require('../../assets/analysis/subconscious/subconscious2.png'),
        colors: ['#EE3B3B', '#F24D4D', '#F76565']
    }
];

interface AnalysisProps {
    timeFrame: TimeFrame;
}

const Analysis = ({ timeFrame }: AnalysisProps) => {

    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const [dreamCount, setDreamCount] = React.useState(0);

    useFocusEffect(
        useCallback(() => {
            getDreamsApi().then((data) => {
                setDreamCount(data.length);
            });
        }, [])
    );

    const handleAnalysisPress = (title: DreamAnalysisCategories) => {

        if (dreamCount === 0) {
            MyShowMessage({
                message: 'No Dreams Found',
                description: 'You need to have at least one dream to access the analysis.',
                type: 'info',
            });
            return;
        }
        navigation.navigate('AsteriaChat', { selectedCategory: title, timeFrame, dream: null });
    }


    return (
        <FlatList
            style={{ marginTop: 10 }}
            contentContainerStyle={{ paddingBottom: 40, marginTop: 25 }}
            showsVerticalScrollIndicator={false}
            data={mockData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <LinearGradient
                    colors={item.colors}
                    style={styles.itemContainer}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <TouchableOpacity onPress={() => handleAnalysisPress(item.title)}>
                        <Text style={{ color: 'rgba(255,255,255,1)', fontSize: width * 0.057, fontFamily: 'Outfit-SemiBold', paddingRight: 140 }}>{item.title}</Text>
                        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: width * 0.042, fontFamily: 'Outfit-Regular', paddingRight: 160, marginTop: 5, }}>{item.subtitle}</Text>
                        <Image source={item.image} style={{ width: 160, height: 160, resizeMode: 'cover', position: 'absolute', right: 0, top: 0, zIndex: -1, }} />
                    </TouchableOpacity>
                </LinearGradient>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    itemContainer: {
        borderRadius: 20,
        marginBottom: 20,
        paddingTop: 23,
        paddingBottom: 30,
        paddingLeft: 22,
        minHeight: 180,
    },
});

export default Analysis;

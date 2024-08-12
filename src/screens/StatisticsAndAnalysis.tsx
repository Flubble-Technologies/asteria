import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TabSwitcher from '../components/StatisticsAndAnalysis/TabSwitcher';
import Statistics from '../components/StatisticsAndAnalysis/Statistics';
import Analysis from '../components/StatisticsAndAnalysis/Analysis';
import { getDreamStatsApi } from '../api/requests/dreams.api';
import { DreamStatistics } from '../types/IDream-statistics';
import { TimeFrame } from '../constants/time-frame';

const { width } = Dimensions.get('window');

const StatisticsAndAnalysis = () => {
	const [error, setError] = useState(false);
	const [selectedTab, setSelectedTab] = useState('Analysis');
	const [statistics, setStatistics] = useState<DreamStatistics | null>(null);
	const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>(TimeFrame.weekly);

	const fetchStatistics = useCallback(async () => {
		getDreamStatsApi(selectedTimeFrame).then((data) => {
			setStatistics(data);
		}).catch((err) => {
			setError(true);
		});
	}, [selectedTimeFrame]);

	useEffect(() => {
		fetchStatistics();
	}, [fetchStatistics]);

	// TODO: Add error handling : Eyüp
	if (error) {
		return <Text>Error</Text>;
	}

	if (!statistics) {
		return <ActivityIndicator size="large" color="#7E57C2" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
	}

	const { dreams, emotions, recurringElements, total } = statistics;

	const dreamsPieData = [
		{
			name: 'Dream',
			population: dreams.DREAM,
			color: '#7E57C2',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		},
		{
			name: 'Nightmare',
			population: dreams.NIGHTMARE,
			color: '#9B78D1',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		},
		{
			name: 'Lucid',
			population: dreams.LUCID,
			color: '#B79AF1',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		}
	];

	const emotionsPieData = [
		{
			name: 'Positive',
			population: emotions.positive,
			color: '#7E57C2',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		},
		{
			name: 'Negative',
			population: emotions.negative,
			color: '#9B78D1',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		},
		{
			name: 'Neutral',
			population: emotions.neutral,
			color: '#B79AF1',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		}
	];

	const recurringElementsBarData = {
		labels: Object.keys(recurringElements),
		datasets: [
			{
				data: Object.values(recurringElements),
			},
		],
	};


	const timeFrames = [
		{ label: '7D', value: TimeFrame.weekly },
		{ label: '1M', value: TimeFrame.monthly },
		{ label: '1Y', value: TimeFrame.yearly },
		{ label: 'All', value: TimeFrame.allTime }
	];

	return (
		<LinearGradient
			colors={['#000000', '#0a0a0a', '#000000']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={styles.container}
		>
			<SafeAreaView />
			<Text style={
				[
					styles.title,
					{
						marginTop: Platform.OS === 'android' ? 10 : 0,
					}
				]
			}>{selectedTab}</Text>
			<TabSwitcher selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			<View style={styles.buttonGroup}>
				<View style={styles.innerButtonGroup}>
					{timeFrames.map((timeFrame) => (
						<TouchableOpacity
							key={timeFrame.value}
							style={[
								styles.timeFrameButton,
								selectedTimeFrame === timeFrame.value && styles.selectedTimeFrameButton
							]}
							onPress={() => setSelectedTimeFrame(timeFrame.value)}
						>
							<Text style={[styles.timeFrameButtonText, selectedTimeFrame !== timeFrame.value && { color: 'white' }]}>
								{timeFrame.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{selectedTab === 'Analysis' ? (
				<Analysis timeFrame={selectedTimeFrame} selectedTimeFrame={selectedTimeFrame} />
			) : (
				<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
					<Statistics
						totalDreamsCount={total}
						getDreamFrequencyData={() => {
							return {
								labels: ['Total Dreams'],
								datasets: [{ data: [total] }]
							};
						}}
						dreamsPieData={dreamsPieData}
						emotionsPieData={emotionsPieData}
						recurringElementsBarData={recurringElementsBarData}
					/>
				</ScrollView>
			)}
		</LinearGradient>
	);
};

export default StatisticsAndAnalysis;

const styles = StyleSheet.create({
	title: {
		color: 'rgba(255,255,255,0.85)',
		fontSize: width * 0.075,
		fontFamily: 'Outfit-Medium',
	},
	container: {
		flex: 1,
		paddingHorizontal: 20
	},
	scrollContent: {
		paddingBottom: 20
	},
	buttonGroup: {
		flexDirection: 'row',
		marginTop: 30,
	},
	innerButtonGroup: {
		backgroundColor: 'rgba(255,255,255,0.12)',
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	timeFrameButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8
	},
	selectedTimeFrameButton: {
		backgroundColor: 'rgba(255,255,255,0.9)'
	},
	timeFrameButtonText: {
		color: 'rgba(0,0,0,0.8)',
		fontFamily: 'Outfit-SemiBold',
		fontSize: width * 0.042
	}
});

import React, { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TabSwitcher from '../components/StatisticsAndAnalysis/TabSwitcher';
import Statistics from '../components/StatisticsAndAnalysis/Statistics';
import Analysis from '../components/StatisticsAndAnalysis/Analysis';

const { width } = Dimensions.get('window');

const StatisticsAndAnalysis = () => {
	const [selectedTab, setSelectedTab] = useState('Analysis');
	const [selectedTimeFrame, setSelectedTimeFrame] = useState('weekly');

	const mockData = {
		weekly: {
			dreams: { Dream: 10, Nightmare: 2, Lucid: 3 },
			emotions: { positive: 10, negative: 15, neutral: 5 },
			recurringElements: { "Red House": 3, "Forest": 4, "Elephant": 2, "Cats": 1, "Dogs": 1 }
		},
		monthly: {
			dreams: { Dream: 24, Nightmare: 8, Lucid: 12 },
			emotions: { positive: 30, negative: 40, neutral: 30 },
			recurringElements: { "Red House": 10, "Forest": 12, "Elephant": 8, "Cats": 5, "Dogs": 3 }
		},
		yearly: {
			dreams: { Dream: 280, Nightmare: 100, Lucid: 150 },
			emotions: { positive: 360, negative: 480, neutral: 300 },
			recurringElements: { "Red House": 50, "Forest": 60, "Elephant": 40, "Cats": 20, "Dogs": 15 }
		},
		allTime: {
			dreams: { Dream: 314, Nightmare: 110, Lucid: 165 },
			emotions: { positive: 400, negative: 550, neutral: 335 },
			recurringElements: { "Red House": 63, "Forest": 76, "Elephant": 50, "Cats": 26, "Dogs": 20 }
		}
	};
	
	const getCurrentData = () => {
		switch (selectedTimeFrame) {
			case 'weekly':
				return mockData.weekly;
			case 'monthly':
				return mockData.monthly;
			case 'yearly':
				return mockData.yearly;
			case 'allTime':
				return mockData.allTime;
			default:
				return mockData.weekly;
		}
	};

	const dreamsData = getCurrentData().dreams;
	const emotionsData = getCurrentData().emotions;
	const recurringElementsData = getCurrentData().recurringElements;

	const dreamsPieData = [
		{
			name: 'Dream',
			population: dreamsData.Dream,
			color: '#7E57C2',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		},
		{
			name: 'Nightmare',
			population: dreamsData.Nightmare,
			color: '#9B78D1',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		},
		{
			name: 'Lucid',
			population: dreamsData.Lucid,
			color: '#B79AF1',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		}
	];

	const emotionsPieData = [
		{
			name: 'Positive',
			population: emotionsData.positive,
			color: '#7E57C2',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		},
		{
			name: 'Negative',
			population: emotionsData.negative,
			color: '#9B78D1',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		},
		{
			name: 'Neutral',
			population: emotionsData.neutral,
			color: '#B79AF1',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15
		}
	];

	const recurringElementsBarData = {
		labels: Object.keys(recurringElementsData),
		datasets: [
			{
				data: Object.values(recurringElementsData),
			},
		],
	};

	const getDreamFrequencyData = () => {
		switch (selectedTimeFrame) {
			case 'weekly':
				const totalDreams = dreamsData.Dream + dreamsData.Nightmare + dreamsData.Lucid;
				return {
					labels: ['Total Dreams'],
					datasets: [{ data: [totalDreams] }]
				};
			case 'monthly':
				return {
					labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
					datasets: [{ data: [15, 20, 12, 10] }]
				};
			case 'yearly':
				return {
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					datasets: [{ data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 1) }]
				};
			case 'allTime':
				return {
					labels: ['Total Dreams'],
					datasets: [{ data: [dreamsData.Dream + dreamsData.Nightmare + dreamsData.Lucid] }]
				};
			default:
				return {
					labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					datasets: [{ data: [6, 2, 4, 5, 3, 8, 7] }]
				};
		}
	};

	const totalDreamsCount = dreamsData.Dream + dreamsData.Nightmare + dreamsData.Lucid;

	const timeFrames = [
		{ label: '7D', value: 'weekly' },
		{ label: '1M', value: 'monthly' },
		{ label: '1Y', value: 'yearly' },
		{ label: 'All', value: 'allTime' }
	];

	return (
		<LinearGradient
			colors={['#000000', '#0a0a0a', '#000000']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={styles.container}
		>
			<SafeAreaView />
			<Text style={styles.title}>{selectedTab}</Text>
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
				<Analysis selectedTimeFrame={selectedTimeFrame} />
			) : (
				<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
					<Statistics
						totalDreamsCount={totalDreamsCount}
						getDreamFrequencyData={getDreamFrequencyData}
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

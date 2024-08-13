import {
	Dimensions,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DreamDiaryHeader from '../components/DreamDiary/DreamDiaryHeader';
import { DreamType } from '../constants/dream-types';
import { IDream } from '../types/IDream';
import { getDreamsByFilterApi } from '../api/requests/dreams.api';
import { IQuery, useFilter } from '../types/IQuery';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DreamModal from '../components/common/DreamModal';
import DiaryItem from '../components/DreamDiary/DiaryItem';
import { useFocusEffect } from '@react-navigation/native';
import ErrorComponent from '../components/common/ErrorComponent';
import WarningIcon from '../assets/icons/warning';

const { height } = Dimensions.get('window');

const DreamDiary = () => {
	const [page, setPage] = useState(1);
	const [error, setError] = useState<any>(null);
	const [hasMore, setHasMore] = useState(false);
	const [dreams, setDreams] = useState<IDream[]>([]);
	const [searchVisible, setSearchVisible] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const [searchTextInput, setSearchTextInput] = useState('');
	const [selectedDream, setSelectedDream] = useState<IDream | null>(null);
	const [selectedType, setSelectedType] = useState<DreamType | null>(null);

	const fetchDreams = useCallback(async () => {
		console.log('fetchDreams', searchTextInput, selectedType, page);
		const filters: Record<string, unknown> = {};
		if (searchTextInput) {
			filters.title = searchTextInput;
		}
		if (selectedType) {
			filters.type = selectedType;
		}

		const params: IQuery = {
			limit: 20,
			page: page,
			filters: filters,
		};

		try {
			const response = await getDreamsByFilterApi(params);
			setDreams((prevDreams) => (page === 1 ? response.results : [...prevDreams, ...response.results]));
			setHasMore(response.totalResults > response.results.length);
		} catch (error) {
			setError(error);
		}
	}, [searchTextInput, selectedType, page]);


	useFocusEffect(
		useCallback(() => {
			fetchDreams();
		}, [fetchDreams])
	);


	const handleLoadMore = () => {
		if (hasMore) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	const handlePress = (item: IDream) => {
		setSelectedDream(item);
		setModalVisible(true);
	}

	if (!dreams) {
		return (
			<ActivityIndicator size="large" color="#7E57C2" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
		);
	}


	return (
		<LinearGradient
			colors={['#000000', '#0a0a0a', '#000000']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={styles.container}
		>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaView />
				{
					error ?
						<ErrorComponent
							retryCallback={fetchDreams}
							errorType={error}
						/>
						:

						<FlatList
							ListHeaderComponent={
								<DreamDiaryHeader
									searchVisible={searchVisible}
									selectedType={selectedType}
									setSelectedType={setSelectedType}
									setSearchVisible={setSearchVisible}
									searchTextInput={searchTextInput}
									setSearchTextInput={setSearchTextInput}
								/>
							}
							showsVerticalScrollIndicator={false}
							data={dreams}
							ListEmptyComponent={
								() => {
									console.log('error', error);
									return (

										error ? <ErrorComponent
											retryCallback={fetchDreams}
											errorType={error}
										/> :
											<View style={styles.centeredView}>
												<WarningIcon color={'#7E57C2'} />
												<Text style={styles.errorText}>Warning!</Text>
												<Text style={styles.errorMessage}>No dreams found</Text>

											</View>
									)
								}
							}
							contentContainerStyle={{ paddingBottom: 30 }}
							keyExtractor={(item) => item.id}
							renderItem={({ item, index }) => <DiaryItem item={item} index={index} toggleModal={(item: IDream) => handlePress(item)} />}
							onEndReached={handleLoadMore}
							onEndReachedThreshold={0.5}
						/>
				}
				<DreamModal isVisible={isModalVisible} toggleModal={() => setModalVisible(false)} selectedStar={selectedDream} />
			</GestureHandlerRootView>
		</LinearGradient>
	);
};

export default DreamDiary;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	centeredView: {
		flex: 1,
		marginTop: height * 0.20,
		alignItems: 'center',
		paddingHorizontal: 20, // Add some padding on the sides
	},
	errorText: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#D9534F',
		marginTop: 10, // Add space above the text
	},
	errorMessage: {
		fontSize: 18,
		color: '#6c757d', // Muted text color
		textAlign: 'center',
		marginHorizontal: 10, // Add horizontal margin for better padding
		marginBottom: 30, // Space before the button
	},
	retryButton: {
		backgroundColor: '#D9534F',
		paddingHorizontal: 25,
		paddingVertical: 12,
		borderRadius: 20, // More rounded corners
		elevation: 2, // Shadow for Android
		shadowColor: '#000', // Shadow for iOS
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
	retryButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '500', // Semi-bold text
	},
});

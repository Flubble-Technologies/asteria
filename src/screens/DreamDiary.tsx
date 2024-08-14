import React, { useState, useCallback } from 'react';
import {
	Dimensions,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DreamDiaryHeader from '../components/DreamDiary/DreamDiaryHeader';
import DreamModal from '../components/common/DreamModal';
import DiaryItem from '../components/DreamDiary/DiaryItem';
import ErrorComponent from '../components/common/ErrorComponent';
import WarningIcon from '../assets/icons/warning';
import { DreamImageStatus } from '../constants/dream-image-status';
import MyShowMessage from '../components/common/MyShowMessage';
import { useDreams } from '../context/dream/dream-provider.';
import { IDream } from '../types/IDream';
import { DreamType } from '../constants/dream-types';
import { IQuery } from '../types/IQuery';
import { useFocusEffect } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const DreamDiary = () => {
	const { dreamsWithFilter: dreams, refreshDreams, hasMore, fetchDreamsWithFilter, error } = useDreams(); // Use context to access and refresh dreams
	const [page, setPage] = useState(1);

	const [searchVisible, setSearchVisible] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const [searchTextInput, setSearchTextInput] = useState('');
	const [selectedDream, setSelectedDream] = useState<IDream | null>(null);
	const [selectedType, setSelectedType] = useState<DreamType | null>(DreamType.DREAM);


	const fetchDreams = useCallback(async () => {
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

		fetchDreamsWithFilter(params);

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
		if (item.imageStatus !== DreamImageStatus.done) {
			MyShowMessage({
				message: 'Dream is not ready yet',
				type: 'warning',
				description: 'Please wait for the dream to be ready',
				duration: 3000,
			});
			return;
		}
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
							retryCallback={refreshDreams}
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
									return (
										error ? <ErrorComponent
											retryCallback={refreshDreams}
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
							renderItem={({ item, index }) => <DiaryItem item={item} index={index} toggleModal={(item) => handlePress(item)} />}
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
		paddingHorizontal: 20,
	},
	errorText: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#D9534F',
		marginTop: 10,
	},
	errorMessage: {
		fontSize: 18,
		color: '#6c757d',
		textAlign: 'center',
		marginHorizontal: 10,
		marginBottom: 30,
	},
	retryButton: {
		backgroundColor: '#D9534F',
		paddingHorizontal: 25,
		paddingVertical: 12,
		borderRadius: 20,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
	retryButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '500',
	},
});

import {
	Dimensions,
	FlatList,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ListRenderItem,
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

const DreamDiary = () => {
	const [page, setPage] = useState(1);
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

		const response = await getDreamsByFilterApi(params);
		setDreams((prevDreams) => (page === 1 ? response.results : [...prevDreams, ...response.results]));
		setHasMore(response.totalResults > response.results.length);
	}, [searchTextInput, selectedType, page]);

	useEffect(() => {
		fetchDreams();
	}, [fetchDreams]);

	const handleLoadMore = () => {
		if (hasMore) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	const handlePress = (item: IDream) => {
		setSelectedDream(item);
		setModalVisible(true);
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
					contentContainerStyle={{ paddingBottom: 30 }}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => <DiaryItem item={item} index={index} toggleModal={(item: IDream) => handlePress(item)} />}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.5}
				/>
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
});

import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PremiumBox from '../components/Settings/PremiumBox';
import ManagementButtons from '../components/Settings/ManagementButtons';
import AppInteractionButtons from '../components/Settings/AppInteractionButtons';
import LogOutButton from '../components/Settings/LogOutButton';
import DeveloperSign from '../components/Settings/DeveloperSign';
import DiaryItem from '../components/DreamDiary/DiaryItem';
import DreamDiaryHeader from '../components/DreamDiary/DreamDiaryHeader';

const mockDreamData = [
	{
		id: 1,
		name: "Uçan Balina",
		description: "Bir okyanusun üzerinde uçan dev bir balina gördüm. Balina gökyüzüne doğru yükselirken, renkli bulutların arasında kayboldu.",
		date: "03.25.24",
		type: "Lucid"
	},
	{
		id: 2,
		name: "Kaybolan Şehir",
		description: "Bir harabe şehirde dolaşıyordum. Terk edilmiş binalar arasında eski arkadaşlarımı gördüm ama bana seslenemediler.",
		date: "05.28.23",
		type: "Nightmare"
	},
	{
		id: 3,
		name: "Kediler Partisi",
		description: "Bir parkta kedilerle dolu bir partiye katıldım. Her kedi bir kostüm giymişti ve hepsi dans ediyordu.",
		date: "01.12.24",
		type: "Dream"
	},
	{
		id: 4,
		name: "Yüzen Ada",
		description: "Görkemli bir ada, denizin üzerinde yavaşça hareket ediyordu. Adanın üzerinde rengarenk çiçeklerle dolu bir orman vardı.",
		date: "06.10.24",
		type: "Lucid"
	},
	{
		id: 5,
		name: "Sonsuz Merdiven",
		description: "Sonsuz gibi görünen bir merdiveni tırmanıyordum. Her basamakta farklı bir manzara karşımdaydı.",
		date: "08.11.24",
		type: "Dream"
	},
	{
		id: 6,
		name: "Uçan Balina",
		description: "Bir okyanusun üzerinde uçan dev bir balina gördüm. Balina gökyüzüne doğru yükselirken, renkli bulutların arasında kayboldu.",
		date: "03.25.24",
		type: "Lucid"
	},
	{
		id: 7,
		name: "Kaybolan Şehir",
		description: "Bir harabe şehirde dolaşıyordum. Terk edilmiş binalar arasında eski arkadaşlarımı gördüm ama bana seslenemediler.",
		date: "05.28.23",
		type: "Nightmare"
	},
	{
		id: 8,
		name: "Kediler Partisi",
		description: "Bir parkta kedilerle dolu bir partiye katıldım. Her kedi bir kostüm giymişti ve hepsi dans ediyordu.",
		date: "01.12.24",
		type: "Dream"
	},
	{
		id: 9,
		name: "Yüzen Ada",
		description: "Görkemli bir ada, denizin üzerinde yavaşça hareket ediyordu. Adanın üzerinde rengarenk çiçeklerle dolu bir orman vardı.",
		date: "06.10.24",
		type: "Lucid"
	},
	{
		id: 10,
		name: "Sonsuz Merdiven",
		description: "Sonsuz gibi görünen bir merdiveni tırmanıyordum. Her basamakta farklı bir manzara karşımdaydı.",
		date: "08.11.24",
		type: "Dream"
	}
];

const { width } = Dimensions.get('window');

const DreamDiary = () => {
	return (
		<LinearGradient
			colors={['#000000', '#0a0a0a', '#000000']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={styles.container}
		>
			<SafeAreaView />
			<FlatList
				ListHeaderComponent={DreamDiaryHeader}
				showsVerticalScrollIndicator={false}
				data={mockDreamData}
				contentContainerStyle={{ paddingBottom: 30, }}
				keyExtractor={(item) => item.id.toString()}
				renderItem={DiaryItem}
			/>
		</LinearGradient>
	);
}

export default DreamDiary;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20
	},
});

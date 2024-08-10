import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface TabSwitcherProps {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ selectedTab, setSelectedTab }) => {
    return (
        <View style={styles.tabContainer}>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'Analysis' && styles.selectedTab]}
                    onPress={() => setSelectedTab('Analysis')}
                >
                    <Text style={styles.tabText}>
                        Analysis
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'Statistics' && styles.selectedTab]}
                    onPress={() => setSelectedTab('Statistics')}
                >
                    <Text style={styles.tabText}>
                        Statistics
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TabSwitcher;

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonGroup: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 50,
    },
    tabButton: {
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 50,
    },
    selectedTab: {
        backgroundColor: '#7E57C2',
    },
    tabText: {
        fontFamily: 'Outfit-Medium',
        color: 'rgba(255,255,255,0.8)',
        fontSize: width * 0.042
    }
});

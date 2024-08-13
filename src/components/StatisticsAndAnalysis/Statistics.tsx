import React from 'react';
import { Text, View, StyleSheet, Dimensions, Alert } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Sleeping } from '../../assets/icons';
import { ChartComponent } from '../common/ChartComponent';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { GestureResponderEvent } from 'react-native-modal';

const { width } = Dimensions.get('window');

interface StatisticsProps {
    totalDreamsCount: number;
    getDreamFrequencyData: () => ChartData;
    dreamsPieData: object[];
    emotionsPieData: object[];
    recurringElementsBarData: ChartData;
}

const Statistics = ({ totalDreamsCount, getDreamFrequencyData, dreamsPieData, emotionsPieData, recurringElementsBarData }: StatisticsProps) => {
    const chartConfig = {
        backgroundGradientFrom: '#000000',
        backgroundGradientTo: '#000000',
        color: (opacity = 1) => `rgba(126, 87, 194, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        propsForBackgroundLines: {
            strokeDasharray: ""
        },
        formatYLabel: (yValue: string) => Math.floor(parseInt(yValue)).toString(),
    };

    const updatedDreamsPieData = dreamsPieData.map((item, index) => ({
        ...item,
        color: index === 0 ? '#7E57C2' : index === 1 ? '#71308F' : '#AF9AD3'
    }));
    const updatedEmotionsPieData = emotionsPieData.map((item, index) => ({
        ...item,
        color: index === 0 ? '#7E57C2' : index === 1 ? '#71308F' : '#AF9AD3'
    }));

    return (
        <View>
            <View style={styles.totalDreamsContainer}>
                <Sleeping size={width * 0.15} />
                <View style={styles.totalDreamsTextContainer}>
                    <Text style={styles.totalDreamsText}>Total Number of Dreams</Text>
                    <Text style={styles.totalDreamsCount}>{totalDreamsCount}</Text>
                </View>
            </View>
            <Text style={styles.chartTitle}>Dream Frequency</Text>
            <BarChart
                data={getDreamFrequencyData()}
                width={width - 40}
                height={220}
                chartConfig={{
                    ...chartConfig,
                    fillShadowGradient: '#7E57C2',
                    fillShadowGradientOpacity: 1,
                }}
                yAxisLabel=''
                yAxisSuffix=''
                fromZero
                showBarTops={true}
                style={[styles.chart, { marginLeft: -25 }]}
            />
            <Text style={styles.chartTitle}>Dream Type Distribution</Text>
            <PieChart
                data={updatedDreamsPieData}
                width={width - 40}
                height={190}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
            <Text style={styles.chartTitle}>Emotion Analysis</Text>
            <PieChart
                data={updatedEmotionsPieData}
                width={width - 40}
                height={190}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
            <Text style={styles.chartTitle}>Recurring Elements</Text>
            <BarChart
                data={recurringElementsBarData}
                width={width}
                height={220}
                yAxisLabel=''
                yAxisSuffix=''

                chartConfig={{
                    ...chartConfig,
                    fillShadowGradient: '#7E57C2',
                    fillShadowGradientOpacity: 1,
                    propsForVerticalLabels: {
                        onPress: (event: any) => {
                            Alert.alert('Element', event.target._internalFiberInstanceHandleDEV.memoizedProps.content);
                        },
                        dy: 2.5,
                        dx: -5,
                        fontSize: 13
                    },
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                verticalLabelRotation={-90}
                fromZero
                showBarTops={true}
                style={[styles.chart, { marginLeft: -25 }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    totalDreamsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        backgroundColor: '#9F82D0',
        padding: 12,
        paddingLeft: 25,
        borderRadius: 10,
        marginTop: 25
    },
    totalDreamsTextContainer: {
        marginLeft: 15
    },
    totalDreamsText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: width * 0.05,
        fontFamily: 'Outfit-Medium',
    },
    totalDreamsCount: {
        color: 'rgba(255,255,255,1)',
        fontSize: width * 0.065,
        fontFamily: 'Outfit-SemiBold',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
        marginLeft: -35
    },
    chartTitle: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: width * 0.05,
        fontFamily: 'Outfit-Medium',
        marginTop: 25,
        marginBottom: 10
    },
});

export default Statistics;

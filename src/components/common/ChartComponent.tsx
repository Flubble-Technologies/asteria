import { useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';

interface ChartComponentProps {
    data: any;
}

export const ChartComponent = ({ data }: ChartComponentProps) => {
    const ref = useRef<BarChart | null>(null);

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


    const chartData = {
        labels: data.labels.map((label:string) => truncateLabel(label)),
        datasets: data.datasets.map((dataset: any) => {
            return {
                data: dataset.data,
            };
        })
    };

    return (
        <BarChart
            data={chartData}
            width={Dimensions.get('window').width}
            height={220}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            withInnerLines={false}
            ref={ref}
            yAxisLabel=""
            verticalLabelRotation={-90}
            withCustomBarColorFromData={true}
            yAxisSuffix=''
            chartConfig={{
                ...chartConfig,
                fillShadowGradient: '#7E57C2',
                labelColor: (opacity = 10) => `white`,
                fillShadowGradientOpacity: 1,
            }}
            xLabelsOffset={-20}
            fromZero
            showBarTops={true}
            flatColor
            style={styles.chart}
        />
    );
};

// Helper function to truncate labels
const truncateLabel = (label: string, maxLength = 16) => {
    if (label.length > maxLength) {
        return `${label.substring(0, maxLength)}...`; // Truncate and add ellipsis
    }
    return label;
};


const styles = StyleSheet.create({
    chart: {
        marginVertical: 8,
        borderRadius: 16,
        marginLeft: -25
    },
});
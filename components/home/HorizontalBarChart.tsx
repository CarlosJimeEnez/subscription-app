import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

    interface Props {
        className?: string;
    }

const HorizontalBarChart = ({className}: Props) => {
    

    const barData = [
        {value: 250, label: 'Jan'},
        {value: 500, label: 'Feb'},
        {value: 745, label: 'Mar'},
        {value: 320, label: 'Apr'},
        {value: 600, label: 'May'},
    ];

    return (
        <View className={`${className} text-text`}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Horizontal Bar Chart</Text>
            <BarChart
                horizontal
                barWidth={22}
                barBorderRadius={4}
                frontColor={'lightgray'}
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
                width={300}
            />
        </View>
    );
};

export default HorizontalBarChart;

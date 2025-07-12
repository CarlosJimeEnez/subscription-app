import { Text, View, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface Props {
    className?: string;
}

const HorizontalBarChart = ({ className }: Props) => {
    const { width: screenWidth } = useWindowDimensions();
    // The parent container has a padding of px-5 (20px on each side), so we subtract 40
    // The parent on the home screen has px-5 (40px) and this component has p-5 (40px)
    // Total horizontal padding = 40 + 40 = 80
    const chartWidth = screenWidth - 80;

    const lineData = [
        {value: 0, dataPointText: '0', label: 'Jan'},
        {value: 20, dataPointText: '20', label: 'Feb'},
        {value: 18, dataPointText: '18', label: 'Mar'},
        {value: 40, dataPointText: '40', label: 'Apr'},
        {value: 36, dataPointText: '36', label: 'May'},
        {value: 60, dataPointText: '60', label: 'Jun'},
        {value: 54, dataPointText: '54', label: 'Jul'},
        {value: 85, dataPointText: '85', label: 'Aug'}
    ];

    return (
        <View className={`${className} text-text border p-5 `}>
            <Text className="text-text text-2xl font-bold">Spending</Text>
            <View className="flex-row items-center justify-center  rounded-xl " >
                <LineChart
                curved
                initialSpacing={20}
                data={lineData}
                spacing={chartWidth / 8}
                textColor1="white"
                textShiftY={-8}
                textShiftX={-10}
                textFontSize={12}
                thickness={4}
                hideRules
                hideYAxisText
                yAxisColor="transparent"
                showVerticalLines
                verticalLinesColor="none"
                xAxisColor="#374151" // Color de la línea horizontal Gris
                color="white"
                xAxisLabelTextStyle={{ color: 'white' }}
                width={chartWidth}
            />
            </View>
        </View>
    );
};

export default HorizontalBarChart;

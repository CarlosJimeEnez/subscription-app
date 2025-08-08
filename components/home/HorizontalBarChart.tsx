import { formatMonth } from "@/helpers/formatDay";
import { useEffect, useState } from "react";
import { AppState, Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface Props {
    className?: string;
}

// Datos fijos para el gráfico de gastos
interface SpendingData {
    value: number;
    color: string;
    text?: string;
    label?: string;
    shiftX?: number;
    shiftY?: number;
}

const HorizontalBarChart = ({ className }: Props) => {
    const { width: screenWidth } = useWindowDimensions();
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    // Datos fijos como en el ejemplo de gifted-charts
    const spendingData: SpendingData[] = [
        { value: 1, color: '#177AD5', text: '12%', label: 'Entretenimiento' },
    ];
    
    // Total fijo
    const totalSpent = 2073;

    // Cuando la aplicación entra en primer plano actualiza la fecha a la actual
    useEffect(() => {
        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState === 'active') {
                setSelectedDate(new Date());
            }
        };
        
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription?.remove();
    }, []);

    // Funciones para cambiar el mes
    const goToPreviousMonth = () => {
        const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
        setSelectedDate(newDate);
    };

    const goToCurrentMonth = () => {
        setSelectedDate(new Date());
    };

    const goToNextMonth = () => {
        const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
        setSelectedDate(newDate);
    };

    return (
        <View className={`${className} text-text p-5`}>
            <View className="items-center">
                {/* Gráfico de pie */}
                <View className="relative">
                    <PieChart
                        data={spendingData}
                        radius={110}
                        donut
                        innerRadius={80}
                        innerCircleColor={"#101323"}
                        centerLabelComponent={() => (
                            <View className="items-center w-full">
                                <Text className="text-text text-2xl font-bold">
                                    ${totalSpent.toLocaleString()}
                                </Text>
                            </View>
                        )}
                    />
                </View>

                {/* Botones de período */}
                <View className="flex-row mt-6 space-x-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row space-x-3">
                            {/* Mes anterior */}
                            <Pressable 
                                onPress={goToPreviousMonth}
                                className="flex-row items-center justify-center p-3 mx-1 rounded-full min-w-[120px] bg-secondary"
                            >
                                <Text className="text-text text-lg font-bold">
                                    {formatMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                                </Text>
                            </Pressable>
                            
                            {/* Mes actual - SIEMPRE DESTACADO */}
                            <Pressable 
                                onPress={goToCurrentMonth}
                                className="flex-row items-center justify-center p-3 mx-1 rounded-full min-w-[120px] bg-accent"
                            >
                                <Text className="text-white text-lg font-bold">
                                    {formatMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))}
                                </Text>
                            </Pressable>
                            
                            {/* Mes siguiente */}
                            <Pressable 
                                onPress={goToNextMonth}
                                className="flex-row items-center justify-center p-3 mx-1 rounded-full min-w-[120px] bg-secondary"
                            >
                                <Text className="text-text text-lg font-bold">
                                    {formatMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                                </Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>

                {/* Leyenda */}
                <View className="mt-4 w-full">
                    {spendingData.map((item, index) => (
                        <View key={index} className="flex-row items-center justify-between py-1">
                            <View className="flex-row items-center">
                                <View
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: item.color }}
                                />
                                <Text className="text-gray-300 text-sm">{item.label}</Text>
                            </View>
                            <Text className="text-white text-sm font-semibold">{item.text}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default HorizontalBarChart;

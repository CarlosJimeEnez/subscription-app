import { Calendar } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface Props {
    className?: string;
}

// Simulación de datos que vendrían desde el backend
interface SpendingData {
    value: number;
    color: string;
    text?: string;
    label?: string;
}

const HorizontalBarChart = ({ className }: Props) => {
    const { width: screenWidth } = useWindowDimensions();
    const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalSpent, setTotalSpent] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempDate, setTempDate] = useState(new Date());

    // Función para simular llamada al backend
    const fetchSpendingData = async (date: Date): Promise<SpendingData[]> => {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        const categories = [
            { label: 'Entretenimiento', color: '#3B82F6' }, // Azul
            { label: 'Comida', color: '#EF4444' }, // Rojo
            { label: 'Transporte', color: '#10B981' }, // Verde
            { label: 'Servicios', color: '#8B5CF6' }, // Púrpura
            { label: 'Compras', color: '#F59E0B' }, // Naranja
        ];

        // Generar datos aleatorios para cada categoría basados en la fecha
        const seed = date.getMonth() + date.getFullYear();
        const data: SpendingData[] = categories.map((category, index) => {
            const randomValue = Math.floor((Math.sin(seed + index) + 1) * 15) + 5; // Valores consistentes entre 5 y 35
            return {
                value: randomValue,
                color: category.color,
                text: `${randomValue}%`,
                label: category.label
            };
        });

        return data;
    };

    // Cargar datos cuando cambia la fecha
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchSpendingData(selectedDate);
                setSpendingData(data);

                // Calcular total gastado basado en la fecha
                const seed = selectedDate.getMonth() + selectedDate.getFullYear();
                const total = Math.floor((Math.sin(seed) + 1) * 1000) + 500; // Entre $500 y $2500
                setTotalSpent(total);
            } catch (error) {
                console.error('Error fetching spending data:', error);
                // En caso de error, usar datos por defecto
                const defaultData = [
                    { value: 20, color: '#3B82F6', text: '20%', label: 'Entretenimiento' },
                    { value: 8, color: '#EF4444', text: '8%', label: 'Comida' },
                    { value: 12, color: '#10B981', text: '12%', label: 'Transporte' },
                    { value: 24, color: '#8B5CF6', text: '24%', label: 'Servicios' },
                    { value: 36, color: '#F59E0B', text: '36%', label: 'Compras' }
                ];
                setSpendingData(defaultData);
                setTotalSpent(1244.65);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [selectedDate]);

    const formatDate = (date: Date) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            setTempDate(date);
        }
    };

    const handleDateConfirm = () => {
        setSelectedDate(tempDate);
        setShowDatePicker(false);
    };

    const handleDateCancel = () => {
        setTempDate(selectedDate);
        setShowDatePicker(false);
    };

    return (
        <View className={`${className} text-text border p-5`}>
            <Text className="text-text text-2xl font-bold mb-4">Spending</Text>
            {isLoading ? (
                <View className="flex-row items-center justify-center h-64">
                    <Text className="text-text text-lg">Cargando gastos...</Text>
                </View>
            ) : (
                <View className="items-center">
                    {/* Gráfico de pie */}
                    <View className="relative">
                        <PieChart
                            data={spendingData}
                            radius={100}
                            strokeColor="transparent"
                            strokeWidth={3}
                            donut
                            innerRadius={80}
                            centerLabelComponent={() => (
                                <View className="items-center">
                                    {/* DatePicker personalizado */}
                                    <TouchableOpacity
                                        onPress={() => setShowDatePicker(true)}
                                        className="flex-row items-center justify-center "
                                    >
                                        <Text className="text-gray-400 text-xs ">
                                            {formatDate(selectedDate)}
                                        </Text>
                                        <Calendar size={12} color="#9CA3AF" />
                                    </TouchableOpacity>
                                    <Text className="text-text text-2xl font-bold">
                                        ${totalSpent.toLocaleString()}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>

                    {/* Botones de período */}
                    <View className="flex-row mt-6 space-x-4">
                        <Text className="text-gray-400 text-base">Week</Text>
                        <Text className="text-white text-base font-semibold underline">Month</Text>
                        <Text className="text-gray-400 text-base">Year</Text>
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
            )}

        </View>
    );
};

export default HorizontalBarChart;

import { formatDay } from '@/helpers/formatDay'
import { FormatPrice } from '@/helpers/formatPrice'
import { getCategoryColor } from '@/helpers/getCategoryColors'
import { getCategoryIcon } from '@/helpers/getCategoryIcon'
import { Expense } from '@/interface/expense.interface'
import { Ionicons } from '@expo/vector-icons'
import { Edit, Trash2 } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
    expense: Expense
}

const ExpenseDetailComponent = ({ expense }: Props) => {
    const { top, bottom } = useSafeAreaInsets();
    const iconName = getCategoryIcon(expense.category)
    const categoryColor = getCategoryColor(expense.category)

    return (
        <View className="flex-1 bg-[#101323]">
            <ScrollView 
                style={{ paddingTop: top }} 
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 100 }} // Espacio para los botones
            >
                {/* Header */}
                <View className="px-4 py-3">
                    <Text className="text-white text-2xl font-bold text-center mb-2">Detalles del Gasto</Text>
                </View>

                {/* Main Card */}
                <View className="mx-4 mb-6">
                    <View className="bg-[#1a1f3a] rounded-2xl p-6">
                        {/* Category Icon */}
                        <View className="items-center mb-4">
                            <View 
                                className="w-20 h-20 rounded-full items-center justify-center mb-3"
                                style={{ backgroundColor: categoryColor + '20' }}
                            >
                                <Ionicons 
                                    name={iconName} 
                                    size={40} 
                                    color={categoryColor} 
                                />
                            </View>
                            <Text className="text-white text-xl font-bold">{expense.name}</Text>
                            <Text className="text-gray-400 text-base">{expense.category}</Text>
                        </View>

                        {/* Amount */}
                        <View className="items-center mb-6">
                            <Text className="text-white text-3xl font-bold">
                                {FormatPrice.format(expense.amount)}
                            </Text>
                        </View>

                        {/* Details Grid */}
                        <View className="space-y-4">
                            {/* Date */}
                            <View className="flex-row justify-between items-center py-3 border-b border-gray-700">
                                <Text className="text-gray-400 text-base">Fecha</Text>
                                <Text className="text-white text-base font-medium">
                                    {formatDay(new Date(expense.date))}
                                </Text>
                            </View>

                            {/* Description */}
                            {expense.description && (
                                <View className="py-3 border-b border-gray-700">
                                    <Text className="text-gray-400 text-base mb-2">Descripción</Text>
                                    <Text className="text-white text-base">{expense.description}</Text>
                                </View>
                            )}

                            

                            {/* Created At */}
                            {expense.createdAt && (
                                <View className="flex-row justify-between items-center py-3">
                                    <Text className="text-gray-400 text-base">Creado</Text>
                                    <Text className="text-white text-base font-medium">
                                        {formatDay(new Date(expense.createdAt))}
                                    </Text>
                                </View>
                            )}

                           
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons - Fixed at bottom */}
            <View 
                className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-[#101323]"
                style={{ paddingBottom: bottom + 16 }}
            >
                <View className="flex-row gap-3">
                    <View className="flex-1 bg-accent rounded-xl p-4 items-center">
                        <Edit size={20} color="white" />
                        <Text className="text-white font-medium mt-1">Editar</Text>
                    </View>
                    <View className="flex-1 bg-red-600 rounded-xl p-4 items-center">
                        <Trash2 size={20} color="white" />
                        <Text className="text-white font-medium mt-1">Eliminar</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ExpenseDetailComponent
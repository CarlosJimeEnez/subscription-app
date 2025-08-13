import AnimacionPensando from '@/components/chat/AnimacionPensando'
import ErrorLoadingGasto from '@/components/gastos/ErrorLoadingGasto'
import { useExpense } from '@/hooks/expenses/useExpenses'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ExpenseDetail = () => {
    const { top } = useSafeAreaInsets();
    const { id } = useLocalSearchParams<{ id: string }>() 
    const { expense } = useExpense(id)

    if (expense.isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <AnimacionPensando text="Cargando gasto" color="#3B82F6" size={12} />
            </View>
        )
    }

    if (expense.error) {
        return (
            <ErrorLoadingGasto />
        )
    }

    return (
        <ScrollView>
            <View style={{ paddingTop: top }}>
                <Text className='text-text'>Expense Detail</Text>
                <Text className='text-text'>{expense.data?.name}</Text>
            </View>
        </ScrollView>
    )
}

export default ExpenseDetail
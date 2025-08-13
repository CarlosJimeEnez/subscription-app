import ErrorLoadingGasto from '@/components/gastos/ErrorLoadingGasto'
import ExpenseDetailComponent from '@/components/gastos/ExpenseDetailComponent'
import LoadingExpenses from '@/components/home/LoadingExpenses'
import { useExpense } from '@/hooks/expenses/useExpenses'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const ExpenseDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { expense } = useExpense(id)

    if (expense.isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <LoadingExpenses message="Cargando gasto..." />
            </View>
        )
    }

    if (expense.error) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <ErrorLoadingGasto />
            </View>
        )
    }

    if (!expense.data) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <LoadingExpenses message="Gasto no encontrado..." />
            </View>
        )
    }

    return <ExpenseDetailComponent expense={expense.data} />
}

export default ExpenseDetail
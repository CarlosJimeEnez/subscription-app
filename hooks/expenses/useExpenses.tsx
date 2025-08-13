import { getExpense, getExpenses } from '@/actions/expenses/getExpenses.acton'
import { useQuery } from '@tanstack/react-query'

export const useExpenses = (enabled = true) => {
    const expenses = useQuery({
        queryKey: ['gastos'],
        queryFn: getExpenses,
        enabled,
        staleTime: 1000 * 60 * 60 * 24, // 24 horas
    })

    return {
        expenses
    }
}

export const useExpense = (id: string) => {
    const expense = useQuery({
        queryKey: ['gasto', id],
        queryFn: () => getExpense(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 60 * 24, // 24 horas
    })

    return {
        expense
    }
}

export default useExpenses
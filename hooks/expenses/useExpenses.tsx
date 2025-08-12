import { getExpenses } from '@/actions/expenses/getExpenses.acton'
import { useQuery } from '@tanstack/react-query'

export const useExpenses = () => {
    const expenses = useQuery({
        queryKey: ['gastos'],
        queryFn: getExpenses,
        staleTime: 1000 * 60 * 60 * 24, // 24 horas
    })

    return {
        expenses
    }
}

export default useExpenses
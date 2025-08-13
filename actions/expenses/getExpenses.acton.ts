import { Expense } from "@/interface/expense.interface";
import { GetExpensesResponse } from "@/interface/expenses-response.interface";
import expensesApi from "./expenses.api";

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const { data } = await expensesApi.get<GetExpensesResponse>("");
    console.log('Response from backend:', data);

    // Verificar si la respuesta fue exitosa
    if (data.success) {
      console.log(`Successfully fetched ${data.count} expenses for user ${data.userId}`);
      return data.data;
    } else {
      console.error('Backend returned error:', data.message, data.error);
      throw new Error(data.message || 'Error fetching expenses');
    }
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const getExpense = async (id: string): Promise<Expense> => {
    try {
        const { data } = await expensesApi.get<{data: Expense, success: boolean, message: string}>(`/${id}`);
        console.log('Response from backend:', data);
        
        // Verificar si la respuesta fue exitosa y extraer los datos
        if (data.success) {
            console.log(`Successfully fetched expense: ${data.data.name}`);
            return data.data; // Extraer el objeto expense de data.data
        } else {
            console.error('Backend returned error:', data.message);
              throw new Error(data.message || 'Error fetching expense');
        }
    } catch (error) {
        console.error('Error fetching expense:', error);
        throw error;
    }
}

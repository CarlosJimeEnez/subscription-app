import { Expense } from "@/interface/expense.interface";
import expensesApi from "./expenses.api";

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const { data } = await expensesApi.get<Expense[]>("");
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw new Error();
  }
};
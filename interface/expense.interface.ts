export interface Expense {
  id: string;
  amount: number;
  name: string;
  category: string;
  date: string;
  description?: string;
  tags?: string[];
  createdAt?: Date;
}

import { Expense } from './expense.interface';

// Tipo base para la respuesta
export interface GetExpensesResponseDto {
    success: boolean;
    data: Expense[];
    userId?: string;
    count?: number;
    message: string;
    error?: string;
}

// Tipo específico para respuesta exitosa
export interface GetExpensesSuccessResponseDto {
    success: true;
    data: Expense[];
    userId: string;
    count: number;
    message: string;
}

// Tipo específico para respuesta de error
export interface GetExpensesErrorResponseDto {
    success: false;
    message: string;
    error?: string;
    data: [];
}

// Union type para cubrir ambos casos
export type GetExpensesResponse = GetExpensesSuccessResponseDto | GetExpensesErrorResponseDto;
export interface Subscription {
    id: string;
    name: string;
    price: number;
    description: string;
    category: Category;
    nextPaymentDate: string;
    status: string;
    billingCycle: BillingCycle;
}
export type BillingCycle = "Monthly" | "Yearly";
export type Category = "Music" | "Entertainment" | "Services" | "Productivity" | "Gaming" | "Other";